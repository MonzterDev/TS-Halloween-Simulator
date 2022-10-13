import { CommandContext } from "@rbxts/cmdr";
import { getLuckStat, getPowerStat, getRangeStat, getSizeStat } from "server/utils/Stats";
import { BasketUpgrade } from "shared/constants/Basket";

export = function ( context: CommandContext, stat: BasketUpgrade, player: Player = context.Executor) {
    switch (stat) {
        case "Size":
            return getSizeStat(player)
        case "Range":
            return getRangeStat(player)
        case "Power":
            return getPowerStat(player)
        case "Luck":
            return getLuckStat(player)
    }
}