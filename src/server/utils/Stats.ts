import { Dependency } from "@flamework/core"
import { BoostsService } from "server/services/BoostsService"
import { PlayerDataService } from "server/services/PlayerDataService"
import { BasketUpgradeConfig } from "shared/constants/Basket"
import { Boosts, BoostsConfig } from "shared/constants/Boosts"

const playerDataService = Dependency(PlayerDataService)

const DEFAULT_RANGE = 5

function getBooster ( player: Player, booster: Boosts ): number {
    const boostsService = Dependency( BoostsService )
    const activeBoosts = boostsService.getActiveBoosts( player )

    const boosterRarity = activeBoosts.get( booster )
    if ( !boosterRarity ) return 0

    const multiplier = BoostsConfig[booster][boosterRarity]
    return multiplier
}

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

    const booster = getBooster( player, "Luck" )
    amount += booster

    const basketUpgradeLevel = profile.data.basket_upgrades.luck
    const basketStat = BasketUpgradeConfig.luck[basketUpgradeLevel]
    amount += basketStat

    return amount
}