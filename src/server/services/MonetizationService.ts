import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Debris, MarketplaceService, Players } from "@rbxts/services";
import { Events } from "server/network";
import { Boost, BOOSTS } from "shared/constants/Boosts";
import { calculateCoinReward, COIN_PRODUCTS, DevProduct, DevProductID, Gamepass, GamepassID, getDevProductFromID, getDevProductIDFromDevProduct, getGamepassAsProp, getGamepassFromID } from "shared/constants/Monetization";
import { BoostsService } from "./BoostsService";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class MonetizationService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)
    private boostsService = Dependency(BoostsService)

    onStart() {
        MarketplaceService.ProcessReceipt = ( receiptInfo ) => this.purchaseProduct( receiptInfo )
        MarketplaceService.PromptGamePassPurchaseFinished.Connect((player, id, wasPurchased) => this.purchaseGamepass(player, <GamepassID>tostring(id), wasPurchased))
    }

    private purchaseGamepass ( player: Player, id: GamepassID, wasPurchased: boolean ) {
        if ( !wasPurchased ) return
        const product = getGamepassFromID( id )?.displayName
        this.givePassReward(player, product!)
    }

    private givePassReward ( player: Player, product: Gamepass ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        profile.data.analytics.gamepasses_purchased += 1
        profile.data.gamepasses.set(product, true)
        Events.purchaseSuccess.fire(player, product)
        Events.updateGamepass.fire(player, product)
    }


    private purchaseProduct ( receiptInfo: ReceiptInfo ): Enum.ProductPurchaseDecision {
        const player = Players.GetPlayerByUserId( receiptInfo.PlayerId )
        if ( !player ) return Enum.ProductPurchaseDecision.NotProcessedYet
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return Enum.ProductPurchaseDecision.NotProcessedYet

        const productId = <DevProductID>tostring( receiptInfo.ProductId )

        const product = getDevProductFromID( productId )?.displayName
        return this.productReward( player,  product!)
    }

    private productReward ( player: Player, product: DevProduct ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return Enum.ProductPurchaseDecision.NotProcessedYet

        profile.data.analytics.dev_products_purchased += 1
        Events.purchaseSuccess.fire( player, product )
        if ( COIN_PRODUCTS.includes(product) ) {
            const amount = calculateCoinReward( product, profile.data )
            profile.adjustMoney( amount )
            return Enum.ProductPurchaseDecision.PurchaseGranted
        } else if ( BOOSTS.includes( <Boost>product.gsub(" Booster", "")[0] ) ) {
            this.boostsService.rewardBoost( player, <Boost>product.gsub(" Booster", "")[0], "Rare" )
            return Enum.ProductPurchaseDecision.PurchaseGranted
        }

        return Enum.ProductPurchaseDecision.NotProcessedYet
    }

}