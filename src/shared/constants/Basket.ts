export const BasketUpgrades = ["Size", "Range"] as const
export type BasketUpgrades = typeof BasketUpgrades[number]
export const UPGRADE_DESCRIPTION: Record<BasketUpgrades, string> = {
    "Size": "Hold more Candy!",
    "Range": "Pickup Candy from further away!",
}

type Props = Record<number, number>

interface BasketUpgradesConfig {
    size: Props,
    range: Props,
}


export const BasketShopConfig: BasketUpgradesConfig = {
    size: {
        1: 50,
        2: 75,
        3: 100,
        4: 125,
        5: 150,
    },
    range: {
        1: 50,
        2: 75,
        3: 100,
        4: 125,
        5: 150,
    },
}

export const BasketUpgradeConfig = {
    size: {
        1: 10,
        2: 25
    },
    range: {
        1: 5,
        2: 5.1
    }
}

export function getBasketUpgradePrice ( upgrade: BasketUpgrades, level: number ) {
    if (upgrade === "Range") return BasketShopConfig.range[level]
    if ( upgrade === "Size" ) return BasketShopConfig.size[level]

    return 0
}