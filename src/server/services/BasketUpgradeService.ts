import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Functions } from "server/network";
import { BasketShopConfig, BasketUpgradeResponse, BasketUpgrades } from "shared/constants/Basket";
import { PlayerDataService } from "./PlayerDataService";


@Service({})
export class BasketUpgradeService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)

    onInit () {
        Functions.purchaseBasketUpgrade.setCallback((player, upgrade) => this.purchaseBasketUpgrade(player, upgrade))
    }


    private purchaseBasketUpgrade ( player: Player, upgrade: BasketUpgrades ): BasketUpgradeResponse {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return false

        const basketConfig = upgrade === "Range" ? BasketShopConfig.range : BasketShopConfig.size
        const currentLevel = upgrade === "Range" ? profile.data.basket_upgrades.range : profile.data.basket_upgrades.size
        if (currentLevel >= 50) return "Max"
        const price = basketConfig[currentLevel + 1]

        if ( profile.data.money < price ) return "No Money"

        profile.adjustMoney( -price )
        if (upgrade === "Range") profile.data.basket_upgrades.range += 1
        if ( upgrade === "Size" ) profile.data.basket_upgrades.size += 1
        return "Success"
    }

}