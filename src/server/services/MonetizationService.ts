import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Debris, MarketplaceService, Players } from "@rbxts/services";
import { Events } from "server/network";
import { calculateCoinReward, COIN_PRODUCTS, DevProduct, DevProductID, Gamepass, GamepassID, getDevProductFromID, getDevProductIDFromDevProduct, getGamepassAsProp, getGamepassFromID } from "shared/constants/Monetization";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class MonetizationService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)

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
        profile.data.gamepasses[getGamepassAsProp( product )] = true
        Events.purchaseSuccess.fire(player, product)
        Events.updateGamepass.fire(player, product)
        switch (product) {
            // case "Equip More Pets":
            //     profile.data.pet_info.max_equipped += 2
            //     break
            // case "Equip More Pets2":
            //     profile.data.pet_info.max_equipped += 5
            //     break
        }
    }


    private purchaseProduct ( receiptInfo: ReceiptInfo ): Enum.ProductPurchaseDecision {
        const player = Players.GetPlayerByUserId( receiptInfo.PlayerId )
        if ( !player ) return Enum.ProductPurchaseDecision.NotProcessedYet
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return Enum.ProductPurchaseDecision.NotProcessedYet

        const productId = <DevProductID>tostring( receiptInfo.ProductId )

        const product = getDevProductFromID( productId )?.displayName
        return this.handleReward( player,  product!)
    }

    private handleReward ( player: Player, product: DevProduct ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return Enum.ProductPurchaseDecision.NotProcessedYet

        profile.data.analytics.dev_products_purchased += 1
        Events.purchaseSuccess.fire( player, product )
        if ( COIN_PRODUCTS.includes(product) ) {
            const amount = calculateCoinReward( product, profile.data )
            profile.adjustMoney( amount )
            return Enum.ProductPurchaseDecision.PurchaseGranted
        }

        return Enum.ProductPurchaseDecision.NotProcessedYet
    }

}