import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { BoostsService } from "server/services/BoostsService";
import { Boosts } from "shared/constants/Boosts";
import { PetTypes, Rarities } from "shared/constants/Pets";

export = function ( context: CommandContext, boost: Boosts, rarity: Rarities, player: Player = context.Executor, amount: number = 1 ) {
    const boostsService = Dependency( BoostsService )
    while ( amount > 0 ) {
        boostsService.rewardBoost( player, boost, rarity )
        amount -= 1
    }
}