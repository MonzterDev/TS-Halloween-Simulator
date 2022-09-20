import { Dependency } from "@flamework/core"
import { PlayerDataService } from "server/services/PlayerDataService"
import { BasketUpgradeConfig } from "shared/constants/Basket"

const playerDataService = Dependency(PlayerDataService)

const DEFAULT_RANGE = 5

export function getSizeStat ( player: Player ): number {
    let amount = 0
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    const basketUpgradeLevel = profile.data.basket_upgrades.size
    const basketStat = BasketUpgradeConfig.size[basketUpgradeLevel]
    amount += basketStat

    return amount
}

export function getPowerStat ( player: Player ): number {
    let amount = 0
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    const basketUpgradeLevel = profile.data.basket_upgrades.power
    const basketStat = BasketUpgradeConfig.power[basketUpgradeLevel]
    amount += basketStat

    return amount
}

export function getRangeStat ( player: Player ): number {
    let amount = DEFAULT_RANGE
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    const basketUpgradeLevel = profile.data.basket_upgrades.range
    const basketStat = BasketUpgradeConfig.range[basketUpgradeLevel]
    amount = basketStat

    return amount
}

export function getLuckStat ( player: Player ): number {
    let amount = 0
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    const basketUpgradeLevel = profile.data.basket_upgrades.luck
    const basketStat = BasketUpgradeConfig.luck[basketUpgradeLevel]
    amount += basketStat

    return amount
}