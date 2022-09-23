import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { HttpService, Players } from "@rbxts/services";
import { Events, Functions } from "server/network";
import { PetConfig, PetInstanceProps, PetTypes, Rarities, UUID } from "shared/constants/Pets";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class PetsService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)

    onInit () {
        Events.deletePets.connect( ( player, uuid ) => this.deletePets( player, uuid ) )
        Events.deletePet.connect( ( player, uuid ) => this.deletePet( player, uuid ) )
        Events.equipPet.connect( ( player, uuid ) => this.equipPet( player, uuid ) )
        Events.equipBestPets.connect((player) => this.equipBestPets(player))
        Events.unequipPet.connect((player, uuid) => this.unequipPet(player, uuid))
        Events.lockPet.connect( ( player, uuid ) => this.lockPet( player, uuid ) )
        Events.unlockPet.connect((player, uuid) => this.unlockPet(player, uuid))
    }

    private equipBestPets ( player: Player ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const allPets: {uuid: string, power: number}[] = []
        profile.data.pet_inventory.forEach( ( props, uuid ) => {
            const power = PetConfig[props.type][props.rarity]
            allPets.push({uuid: uuid, power: power})
        } )

        allPets.sort( ( a, b ) => {
            return a.power > b.power
        } )

        const maxEquipped = profile.data.pet_info.max_equipped
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

    public rewardPet ( player: Player, petType: PetTypes, rarity: Rarities ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const uuid = HttpService.GenerateGUID(false)
        const props: PetInstanceProps = { rarity: rarity, type: petType}
        profile.data.pet_inventory.set(uuid, props)
        Events.givePet.fire(player, uuid, props)
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
        if (this.getEquippedPets(player).size() === profile.data.pet_info.max_equipped) return

        pet.equipped = true
        Events.equipPet.fire(Players.GetPlayers(), player, uuid, pet.type)
    }

    private unequipPet ( player: Player, uuid: UUID ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const pet = profile.data.pet_inventory.get( uuid )
        if ( !pet || !pet.equipped ) return

        pet.equipped = false
        Events.unequipPet.fire(Players.GetPlayers(), player, uuid)
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
}