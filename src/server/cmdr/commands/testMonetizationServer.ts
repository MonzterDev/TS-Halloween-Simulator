import { CommandContext } from "@rbxts/cmdr";
import { MarketplaceService } from "@rbxts/services";
import { DevProduct, Gamepass, getDevProductIDFromDevProduct, getGamepassIDFromGamepass } from "shared/constants/Gamepasses";

export = function ( context: CommandContext, devProduct: DevProduct | Gamepass, player: Player = context.Executor ) {
    const isGamepass = getGamepassIDFromGamepass(<Gamepass>devProduct)
    let id = getDevProductIDFromDevProduct( <DevProduct>devProduct ) || getGamepassIDFromGamepass( <Gamepass>devProduct )
    if (isGamepass) MarketplaceService.PromptGamePassPurchase(player, tonumber(id)!)
    else MarketplaceService.PromptProductPurchase(player, tonumber(id)!)
}