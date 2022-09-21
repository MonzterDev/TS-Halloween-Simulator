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
        Events.equipPet.connect((player, uuid) => this.equipPet(player, uuid))
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
        if ( !pet ) return

        // Check if has pet & if not equipped & if can equip another pet
        Events.equipPet.fire(Players.GetPlayers(), player, uuid, pet.type)
    }
}