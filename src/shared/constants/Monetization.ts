import { Gamepasses, PlayerData } from "shared/types/PlayerData"

export const GAMEPASSES = [
    "2x Money", "2x Candy",
    "Equip 2 More Pets", "Equip 5 More Pets",
    "100 Pet Storage", "500 Pet Storage",
    "Remove Hatch Cooldown", "Tripple Hatch", "Lucky Eggs"

] as const
export type Gamepass = typeof GAMEPASSES[number]
export const GAMEPASS_IDS = [
    "94737491", "94737363",
    "88116412", "88116438",
    "94738610", "94738652",
    "88116485", "94738209", "94738011"
] as const
export type GamepassID = typeof GAMEPASS_IDS[number]

export interface GamepassConfigProps {
    displayName: Gamepass
    imageId: string
    description: string
}

export const GAMEPASS_CONFIG: Record<GamepassID, GamepassConfigProps> = {
    94737491: {
        displayName: "2x Money",
        imageId: "rbxassetid://129474314",
        description: "Earn 2x more Money when Selling!",
    },
    94737363: {
        displayName: "2x Candy",
        imageId: "rbxassetid://129474314",
        description: "Earn 2x more Candy when Selling!",
    },

    88116412: {
        displayName: "Equip 2 More Pets",
        imageId: "rbxassetid://129474314",
        description: "Equip +1 more pet!",
    },
    88116438: {
        displayName: "Equip 5 More Pets",
        imageId: "rbxassetid://129474314",
        description: "Equip +2 more pets!",
    },

    94738610: {
        displayName: "100 Pet Storage",
        imageId: "rbxassetid://129474314",
        description: "Store an additional 100 Pets!",
    },
    94738652: {
        displayName: "500 Pet Storage",
        imageId: "rbxassetid://129474314",
        description: "Store an additional 500 Pets!",
    },

    88116485: {
        displayName: "Remove Hatch Cooldown",
        imageId: "rbxassetid://129474314",
        description: "Hatch eggs quicker!",
    },
    94738209: {
        displayName: "Tripple Hatch",
        imageId: "rbxassetid://129474314",
        description: "Hatch 3 Eggs at once!",
    },
    94738011: {
        displayName: "Lucky Eggs",
        imageId: "rbxassetid://129474314",
        description: "Improved odds of finding rare pets!",
    },
}

export function getGamepassIDFromGamepass ( gamepass: Gamepass ) {
    for ( const [id, props] of pairs( GAMEPASS_CONFIG ) ) {
        if (props.displayName.gsub(" ", "")[0] === gamepass.gsub(" ", "")[0]) return id
    }
}
export function getGamepassFromID ( gamepassId: GamepassID ) {
    for ( const [id, pass] of pairs( GAMEPASS_CONFIG ) ) {
        if (id.gsub(" ", "")[0] === gamepassId.gsub(" ", "")[0]) return pass
    }
}
export function getGamepassAsProp ( gamepass: Gamepass ) {
    return <keyof Gamepasses> gamepass.gsub(" ", "_")[0].lower()
}

export const COIN_PRODUCTS = [
    "More Coins", "Many Coins", "Lots Coins", "TONS Coins"
]
export const DEV_PRODUCTS = [
    "Luck Booster", "Power Booster",
    ...COIN_PRODUCTS
] as const
export type DevProduct = typeof DEV_PRODUCTS[number]
export const DEV_PRODUCT_IDS = [
    "1325865359", "1325882600",
    "1317443894", "1325865355", "1325865356", "1325865357", "1325865358",

] as const
export type DevProductID = typeof DEV_PRODUCT_IDS[number]

export interface DevProductConfigProps {
    displayName: DevProduct
    imageId: string
    description?: string
    type: "Boost" | "Currency"
}

export const DEV_PRODUCT_CONFIG: Partial<Record<DevProductID, DevProductConfigProps>> = {
    1325865359: {
        displayName: "Luck Booster",
        imageId: "rbxassetid://129474314",
        type: "Boost"
    },
    1325882600: {
        displayName: "Power Booster",
        imageId: "rbxassetid://129474314",
        type: "Boost"
    },

    1317443894: {
        displayName: "Coins",
        imageId: "rbxassetid://129474314",
        type: "Currency"
    },
    1325865355: {
        displayName: "More Coins",
        imageId: "rbxassetid://129474314",
        type: "Currency"
    },
    1325865356: {
        displayName: "Many Coins",
        imageId: "rbxassetid://129474314",
        type: "Currency"
    },
    1325865357: {
        displayName: "Lots Coins",
        imageId: "rbxassetid://129474314",
        type: "Currency"
    },
    1325865358: {
        displayName: "TONS Coins",
        imageId: "rbxassetid://129474314",
        type: "Currency"
    },
}

export function getDevProductIDFromDevProduct ( devProduct: DevProduct ) {
    for ( const [id, product] of pairs( DEV_PRODUCT_CONFIG ) ) {
        if (product.displayName.gsub(" ", "")[0] === devProduct.gsub(" ", "")[0]) return id
    }
}
export function getDevProductFromID ( devProductID: DevProductID ) {
    for ( const [id, product] of pairs( DEV_PRODUCT_CONFIG ) ) {
        if (id.gsub(" ", "")[0] === devProductID.gsub(" ", "")[0]) return product
    }
}

const COIN_PACKAGES: Partial<Record<DevProduct, number>> = {
    "Coins": 1_000,
    "More Coins": 5_000,
    "Many Coins": 20_000,
    "Lots Coins": 50_000,
    "TONS Coins": 100_000,
}

export function calculateCoinReward (coinPackage: DevProduct, profileData: PlayerData ) {
    const totalUpgrades = profileData.basket_upgrades.luck + profileData.basket_upgrades.power + profileData.basket_upgrades.range + profileData.basket_upgrades.size
    const percentIncrease = (totalUpgrades / 2) // TODO: Find balanced price for this

    const amount = COIN_PACKAGES[coinPackage]! + (COIN_PACKAGES[coinPackage]! * percentIncrease)
    return amount
}