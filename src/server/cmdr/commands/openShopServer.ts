import { CommandContext } from "@rbxts/cmdr";
import { Events } from "server/network";
import { Area } from "shared/constants/Areas";

export = function ( context: CommandContext, area: Area) {
    Events.displayBasketUpgradeShop.fire(context.Executor, area)
}