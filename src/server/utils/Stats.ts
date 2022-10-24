import { Dependency } from "@flamework/core"
import { BoostsService } from "server/services/BoostsService"
import { PlayerDataService } from "server/services/PlayerDataService"
import { BASKET_UPGRADE_CONFIG, getBasketUpgradeStat } from "shared/constants/Basket"
import { Boost, BOOSTS_CONFIG } from "shared/constants/Boosts"


const DEFAULT_RANGE_STAT = 5

function getBooster ( player: Player, booster: Boost ): number {
    const boostsService = Dependency( BoostsService )
    const activeBoosts = boostsService.getActiveBoosts( player )

    const boosterRarity = activeBoosts.get( booster )
    if ( !boosterRarity ) return 0

    const multiplier = BOOSTS_CONFIG[booster][boosterRarity]
    return multiplier
}

export function getSizeStat ( player: Player ): number {
    const playerDataService = Dependency(PlayerDataService)

    let amount = 0
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    const basketUpgradeLevel = profile.data.basket_upgrades.Size
    const basketStat = getBasketUpgradeStat("Size", basketUpgradeLevel)
    amount += basketStat

    return amount
}

export function getPowerStat ( player: Player ): number {
    const playerDataService = Dependency(PlayerDataService)

    let amount = 0
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    const basketUpgradeLevel = profile.data.basket_upgrades.Power
    const basketStat = getBasketUpgradeStat("Power", basketUpgradeLevel)
    amount += basketStat

    return amount
}

export function getRangeStat ( player: Player ): number {
    const playerDataService = Dependency( PlayerDataService )

    let amount = DEFAULT_RANGE_STAT
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    const basketUpgradeLevel = profile.data.basket_upgrades.Range
    const basketStat = getBasketUpgradeStat("Range", basketUpgradeLevel)
    amount = basketStat

    return amount
}

export function getLuckStat ( player: Player ): number {
    const playerDataService = Dependency( PlayerDataService )

    let amount = 0
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    const basketUpgradeLevel = profile.data.basket_upgrades.Luck
    const basketStat = getBasketUpgradeStat("Luck", basketUpgradeLevel)
    amount += basketStat

    return amount
}

export function getMoneyMultipler ( player: Player ): number {
    const playerDataService = Dependency( PlayerDataService )

    let amount = 1
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    if (profile.data.gamepasses.get("2x Money")) amount += 1

    return amount
}

export function getCandyMultipler ( player: Player ): number {
    const playerDataService = Dependency( PlayerDataService )

    let amount = 1
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return amount

    if (profile.data.gamepasses.get("2x Candy")) amount += 1

    return amount
}