import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { BoostsService } from "server/services/BoostsService";
import { Boost, BOOSTS } from "shared/constants/Boosts";
import { PETS, RARITIES, Rarity } from "shared/constants/Pets";

export = function ( context: CommandContext, boost: Boost, rarity: Rarity, player: Player = context.Executor, amount: number = 1 ) {
    const boostsService = Dependency( BoostsService )
    while ( amount > 0 ) {
        boostsService.rewardBoost( player, boost, rarity )
        amount -= 1
    }
}