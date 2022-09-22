import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { PetsService } from "server/services/PetsService";
import { PetTypes, Rarities } from "shared/constants/Pets";

export = function ( context: CommandContext, pet: PetTypes, rarity: Rarities, player: Player = context.Executor ) {
    const petService = Dependency( PetsService )
    petService.rewardPet(player, pet, rarity)
}