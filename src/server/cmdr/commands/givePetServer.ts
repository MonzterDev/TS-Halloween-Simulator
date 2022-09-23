import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { PetsService } from "server/services/PetsService";
import { PetTypes, Rarities } from "shared/constants/Pets";

export = function ( context: CommandContext, pet: PetTypes, rarity: Rarities, player: Player = context.Executor, amount: number = 1 ) {
    const petService = Dependency( PetsService )
    while ( amount > 0 ) {
        petService.rewardPet( player, pet, rarity )
        amount -= 1
    }
}