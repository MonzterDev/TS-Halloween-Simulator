import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { HttpService } from "@rbxts/services";
import { Events } from "server/network";
import { PetInstanceProps, PetTypes, Rarities } from "shared/constants/Pets";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class PetsService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)

    onInit() {

    }

    public rewardPet ( player: Player, petType: PetTypes, rarity: Rarities ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const uuid = HttpService.GenerateGUID(false)
        const props: PetInstanceProps = { rarity: rarity, type: petType}
        profile.data.pet_inventory.set(uuid, props)
        Events.givePet.fire(player, uuid, props)
    }

}