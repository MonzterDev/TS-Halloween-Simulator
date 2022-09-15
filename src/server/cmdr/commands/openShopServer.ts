import { CommandContext } from "@rbxts/cmdr";
import { Events } from "server/network";
import { AreaTypes } from "shared/constants/Piles";

export = function ( context: CommandContext, area: AreaTypes) {
    Events.displayBasketUpgradeShop.fire(context.Executor, area)
}