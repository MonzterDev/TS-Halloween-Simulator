import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Profile } from "@rbxts/profileservice/globals";
import { HttpService, Players } from "@rbxts/services";
import { Events, Functions } from "server/network";
import { DEFAULT_MAX_PET_EQUIPPED_AMOUNT, DEFAULT_MAX_PET_STORAGE_AMOUNT, EGGS, PET_CONFIG, PetInstanceProps, PETS, RARITIES, UUID, Pet, Rarity, getMaxPetsEquipped } from "shared/constants/Pets";
import { PlayerData } from "shared/types/PlayerData";
import { PlayerDataService } from "./PlayerDataService";


@Service({})
export class PetsService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)

    onStart () {
        Events.deletePets.connect( ( player, uuid ) => this.deletePets( player, uuid ) )
        Events.deletePet.connect( ( player, uuid ) => this.deletePet( player, uuid ) )
        Events.equipPet.connect( ( player, uuid ) => this.equipPet( player, uuid ) )
        Events.equipBestPets.connect((player) => this.equipBestPets(player))
        Events.unequipPet.connect((player, uuid) => this.unequipPet(player, uuid))
        Events.lockPet.connect( ( player, uuid ) => this.lockPet( player, uuid ) )
        Events.unlockPet.connect( ( player, uuid ) => this.unlockPet( player, uuid ) )
    }

    private equipBestPets ( player: Player ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const allPets: {uuid: string, power: number}[] = []
        profile.data.pet_inventory.forEach( ( props, uuid ) => {
            const power = PET_CONFIG[props.type][props.rarity]
            allPets.push({uuid: uuid, power: power})
        } )

        allPets.sort( ( a, b ) => {
            return a.power > b.power
        } )

        const maxEquipped = getMaxPetsEquipped(profile.data)
        const topPets: { uuid: string, power: number }[] = []
        for ( let x = 0; x < maxEquipped; x++ ) topPets.insert(x, allPets[x])

        const equippedPets = this.getEquippedPets( player )
        for ( let i = 0; i < topPets.size(); i++ ) {
            const info = topPets[i]
            if ( !equippedPets.includes( info.uuid ) ) continue
            equippedPets.remove(equippedPets.indexOf(info.uuid))
            topPets.remove( i )
            i--
        }
        equippedPets.forEach( ( uuid ) => this.unequipPet( player, uuid ))
        topPets.forEach( ( info ) => this.equipPet(player, info.uuid))
    }

    public getEquippedPets ( player: Player ) {
        const pets: string[] = []
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return pets
        profile.data.pet_inventory.forEach( ( props, uuid ) => {
            if (props.equipped) pets.push(uuid)
        } )
        return pets
    }

    private indexPet ( player: Player, petType: Pet ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        for ( const [egg, petsUnlocked] of pairs( profile.data.pet_index ) ) {
            const isPetIndexed = petsUnlocked.get( petType )
            if ( isPetIndexed === undefined || isPetIndexed ) continue

            petsUnlocked.set( petType, true )
            Events.addToPetIndex.fire( player, egg, petType )
            return
        }
    }

    public rewardPet ( player: Player, petType: Pet, rarity: Rarity ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const uuid = HttpService.GenerateGUID(false)
        const props: PetInstanceProps = { rarity: rarity, type: petType}
        profile.data.pet_inventory.set(uuid, props)
        Events.givePet.fire( player, uuid, props )
        this.indexPet(player, petType)
    }

    private deletePet ( player: Player, uuid: UUID ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const pet = profile.data.pet_inventory.get( uuid )
        if ( !pet || pet.locked === true ) return

        this.unequipPet(player, uuid)
        profile.data.pet_inventory.delete( uuid )
        Events.deletePet.fire(player, uuid)
    }

    private deletePets ( player: Player, pets: UUID[] ) {
        pets.forEach((uuid) => this.deletePet(player, uuid))
    }

    private equipPet ( player: Player, uuid: UUID ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const pet = profile.data.pet_inventory.get( uuid )
        if ( !pet || pet.equipped ) return
        if (this.getEquippedPets(player).size() === getMaxPetsEquipped(profile.data)) return

        pet.equipped = true
        Events.equipPet.fire(this.getPlayersToNotify(player), player, uuid, pet.type)
    }

    private unequipPet ( player: Player, uuid: UUID ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const pet = profile.data.pet_inventory.get( uuid )
        if ( !pet || !pet.equipped ) return

        pet.equipped = false
        Events.unequipPet.fire(this.getPlayersToNotify(player), player, uuid)
    }

    private lockPet ( player: Player, uuid: UUID ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const pet = profile.data.pet_inventory.get( uuid )
        if ( !pet || pet.locked ) return

        pet.locked = true
        Events.lockPet.fire(player, uuid)
    }

    private unlockPet ( player: Player, uuid: UUID ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const pet = profile.data.pet_inventory.get( uuid )
        if ( !pet || !pet.locked ) return

        pet.locked = false
        Events.unlockPet.fire(player, uuid)
    }

    public getOthersPets ( sendingPlayer: Player ) {
        Players.GetPlayers().forEach( ( player ) => {
            if ( sendingPlayer === player ) return
            const profile = this.playerDataService.getProfile( player )
            if ( !profile ) return

            const equippedPets = this.getEquippedPets( player )
            equippedPets.forEach( ( uuid ) => {
                const pet = profile.data.pet_inventory.get( uuid )
                if (pet) Events.equipPet.fire(sendingPlayer, player, uuid, pet.type)
            } )
        } )
    }

    // private getOthersPets ( sendingPlayer: Player ) {
    //     const pets: OthersPets = new Map()
    //     Players.GetPlayers().forEach( ( player ) => {
    //         if ( sendingPlayer === player ) return
    //         const profile = this.playerDataService.getProfile( player )
    //         if ( !profile ) return

    //         const playersPets: {uuid: UUID, type: PetTypes}[] = []
    //         const equippedPets = this.getEquippedPets( player )
    //         equippedPets.forEach( ( uuid ) => {
    //             const pet = profile.data.pet_inventory.get( uuid )
    //             playersPets.push({uuid: uuid, type: pet!.type})
    //         } )
    //         pets.set(player.UserId, playersPets)
    //     } )
    //     return pets
    // }

    private getPlayersToNotify (sendingPlayer :Player) {
        const players: Player[] = [sendingPlayer]
        Players.GetPlayers().forEach( ( player ) => {
            if (sendingPlayer === player) return
            const profile = this.playerDataService.getProfile( player )
            if ( !profile ) return
            if (!profile.data.settings.hide_others_pets) players.push(player)
        } )
        return players
    }

    public getMaxPetStorage (player: Player) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return DEFAULT_MAX_PET_STORAGE_AMOUNT

        let total = DEFAULT_MAX_PET_STORAGE_AMOUNT
        // if ( profile.data.gamepasses.equip_more_pets ) total += 2
        // if ( profile.data.gamepasses.equip_more_pets2 ) total += 5
        return total
    }
}