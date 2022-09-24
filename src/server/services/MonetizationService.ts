import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Debris, MarketplaceService, Players } from "@rbxts/services";
import { Events } from "server/network";
import { DevProduct, DevProductID, Gamepass, GamepassID, getDevProductFromID, getDevProductIDFromDevProduct, getGamepassAsProp, getGamepassFromID } from "shared/constants/Gamepasses";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class MonetizationService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)

    onInit() {
        MarketplaceService.ProcessReceipt = ( receiptInfo ) => this.purchaseProduct( receiptInfo )
        MarketplaceService.PromptGamePassPurchaseFinished.Connect((player, id, wasPurchased) => this.purchaseGamepass(player, <GamepassID>tostring(id), wasPurchased))
    }

    private purchaseGamepass ( player: Player, id: GamepassID, wasPurchased: boolean ) {
        if ( !wasPurchased ) return
        const product = getGamepassFromID( id )
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

        const product = getDevProductFromID( productId )
        return this.handleReward( player,  product!)
    }

    private handleReward ( player: Player, product: DevProduct ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return Enum.ProductPurchaseDecision.NotProcessedYet

        profile.data.analytics.dev_products_purchased += 1
        Events.purchaseSuccess.fire(player, product)
        switch (product) {
            case "100,000 Coins":
                profile.adjustMoney( 100_000 )
                return Enum.ProductPurchaseDecision.PurchaseGranted
        }
    }

}