import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Functions } from "server/network";
import { BASKET_SHOP_CONFIG, BasketUpgrade, BasketUpgradeResponse, BASKET_UPGRADES, getBasketUpgradeAsProp } from "shared/constants/Basket";
import { PlayerDataService } from "./PlayerDataService";


@Service({})
export class BasketUpgradeService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)

    onStart () {
        Functions.purchaseBasketUpgrade.setCallback((player, upgrade) => this.purchaseBasketUpgrade(player, upgrade))
    }


    private purchaseBasketUpgrade ( player: Player, upgrade: BasketUpgrade ): BasketUpgradeResponse {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return false

        const basketConfig = BASKET_SHOP_CONFIG[getBasketUpgradeAsProp(upgrade)]
        const currentLevel = profile.data.basket_upgrades[getBasketUpgradeAsProp(upgrade)]
        if (currentLevel >= 50) return "Max"
        const price = basketConfig[currentLevel + 1]

        if ( profile.data.money < price ) return "No Money"

        profile.adjustMoney( -price )
        profile.data.basket_upgrades[getBasketUpgradeAsProp(upgrade)] += 1
        return "Success"
    }

}