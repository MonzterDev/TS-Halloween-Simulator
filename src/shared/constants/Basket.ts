export type BasketUpgradeResponse = "Max" | "No Money" | "Success" | false

export const BasketUpgrades = ["Size", "Range", "Power", "Luck"] as const
export type BasketUpgrades = typeof BasketUpgrades[number]
export const UPGRADE_DESCRIPTION: Record<BasketUpgrades, string> = {
    "Size": "Hold more Candy!",
    "Range": "Pickup Candy from further away!",
    "Power": "Pickup more Candy at a time!",
    "Luck": "Find even more Candy!",
}

type Props = Record<number, number>

interface BasketUpgradesConfig {
    size: Props,
    range: Props,
    power: Props,
    luck: Props,
}


export const BasketShopConfig: BasketUpgradesConfig = {
    size: {
        1: 50,
        2: 75,
        3: 100,
        4: 125,
        5: 150,
        6: 200,
        7: 250,
        8: 300,
        9: 350,
        10: 400,
    },
    range: {
        1: 50,
        2: 75,
        3: 100,
        4: 125,
        5: 150,
        6: 200,
        7: 250,
        8: 300,
        9: 350,
        10: 400,
    },
    power: {
        1: 50,
        2: 75,
        3: 100,
        4: 125,
        5: 150,
        6: 200,
        7: 250,
        8: 300,
        9: 350,
        10: 400,
    },
    luck: {
        1: 50,
        2: 75,
        3: 100,
        4: 125,
        5: 150,
        6: 200,
        7: 250,
        8: 300,
        9: 350,
        10: 400,
    },
}

export const BasketUpgradeConfig: BasketUpgradesConfig = {
    size: {
        0: 10,
        1: 25,
        2: 50
    },
    range: {
        0: 5,
        1: 5.1,
        2: 5.2,
        3: 5.3,
        4: 5.4,
        5: 5.5,
        6: 5.6,
        7: 5.7,
        8: 5.8,
        9: 5.9,
        10: 6,
    },
    power: {
        0: 1,
        1: 2,
        2: 5
    },
    luck: {
        0: 1,
        1: 1.1,
        2: 1.2
    },
}

export function getBasketUpgradePrice ( upgrade: BasketUpgrades, level: number ) {
    return BasketShopConfig[getBasketUpgradeAsProp(upgrade)][level]
}

export function getBasketUpgradeAsProp ( upgrade: BasketUpgrades ) {
    return <keyof BasketUpgradesConfig> upgrade.lower()
}