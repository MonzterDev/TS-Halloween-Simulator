import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { HttpService, Players } from "@rbxts/services";
import { Events, Functions } from "server/network";
import { PetInstanceProps, PetTypes, Rarities, UUID } from "shared/constants/Pets";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class PetsService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)

    onInit () {
        Events.deletePets.connect( ( player, uuid ) => this.deletePets( player, uuid ) )
        Events.deletePet.connect( ( player, uuid ) => this.deletePet( player, uuid ) )
        Events.equipPet.connect( ( player, uuid ) => this.equipPet( player, uuid ) )
        Events.unequipPet.connect((player, uuid) => this.unequipPet(player, uuid))
        Events.lockPet.connect( ( player, uuid ) => this.lockPet( player, uuid ) )
        Events.unlockPet.connect((player, uuid) => this.unlockPet(player, uuid))
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

        pet.equipped = true
        // Check if has pet & if not equipped & if can equip another pet
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