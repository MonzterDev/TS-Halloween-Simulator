import { Dependency } from "@flamework/core"
import { Gamepasses, PlayerData } from "shared/types/PlayerData"

export const GAMEPASSES = ["Equip More Pets", "Equip More Pets2", "Remove Hatch Cooldown"] as const
export type Gamepass = typeof GAMEPASSES[number]
export const GAMEPASS_IDS = ["88116412", "88116438", "88116485"] as const
export type GamepassID = typeof GAMEPASS_IDS[number]

export interface GamepassConfigProps {
    displayName: Gamepass
    imageId: string
    description: string
}

export const GAMEPASS_CONFIG: Record<GamepassID, GamepassConfigProps> = {
    88116412: {
        displayName: "Equip More Pets",
        imageId: "rbxassetid://129474314",
        description: "Equip +1 more pet!",
    },
    88116438: {
        displayName: "Equip More Pets2",
        imageId: "rbxassetid://129474314",
        description: "Equip +2 more pets!",
    },
    88116485: {
        displayName: "Remove Hatch Cooldown",
        imageId: "rbxassetid://129474314",
        description: "Hatch eggs much faster!",
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

export const COIN_PRODUCTS = ["Coins", "More Coins", "Many Coins", "Lots Coins", "TONS Coins"]
export const DEV_PRODUCTS = [ "Luck", ...COIN_PRODUCTS] as const
export type DevProduct = typeof DEV_PRODUCTS[number]
export const DEV_PRODUCT_IDS = ["1317443894", "1", "1325865355", "1325865356", "1325865357", "1325865358", "999"] as const
export type DevProductID = typeof DEV_PRODUCT_IDS[number]

export interface DevProductConfigProps {
    displayName: DevProduct
    imageId: string
    description?: string
    type: "Boost" | "Currency"
}

export const DEV_PRODUCT_CONFIG: Partial<Record<DevProductID, DevProductConfigProps>> = {
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

    999: {
        displayName: "Luck",
        imageId: "rbxassetid://129474314",
        type: "Boost"
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