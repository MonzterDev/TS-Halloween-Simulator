export type BasketUpgradeResponse = "Max" | "No Money" | "Success" | false

export const BASKET_UPGRADES = ["Size", "Range", "Power", "Luck"]
export type BasketUpgrade = typeof BASKET_UPGRADES[number]
export const BASKET_UPGRADE_DESCRIPTION: Record<BasketUpgrade, string> = {
    "Size": "Hold more Candy!",
    "Range": "Pickup Candy from further away!",
    "Power": "Pickup more Candy at a time!",
    "Luck": "Find even more Candy!",
}

type Props = Record<number, number>

type BasketUpgradesConfig = Record<BasketUpgrade, Props>

export const BASKET_SHOP_CONFIG: BasketUpgradesConfig = {
    "Size": {
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
        11: 500,
    },
    "Range": {
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
    "Power": {
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
    "Luck": {
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

export const BASKET_UPGRADE_CONFIG: BasketUpgradesConfig = {
    "Size": {
        0: 10,
        1: 25,
        2: 50
    },
    "Range": {
        0: 10,
        1: 10.1,
        2: 10.2,
        3: 10.3,
        4: 10.4,
        5: 10.5,
        6: 10.6,
        7: 10.7,
        8: 10.8,
        9: 10.9,
        10: 11,
    },
    "Power": {
        0: 1,
        1: 2,
        2: 5
    },
    "Luck": {
        0: 1,
        1: 1.1,
        2: 1.2
    },
}

export function getBasketUpgradePrice ( upgrade: BasketUpgrade, level: number ) {
    return BASKET_SHOP_CONFIG[upgrade][level]
}