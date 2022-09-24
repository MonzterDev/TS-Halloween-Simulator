import { Gamepasses } from "shared/types/PlayerData"

export const GAMEPASSES = ["Equip More Pets", "Equip More Pets2", "Remove Hatch Cooldown"] as const
export type Gamepass = typeof GAMEPASSES[number]
export const GAMEPASS_IDS = ["88116412", "88116438", "88116485"] as const
export type GamepassID = typeof GAMEPASS_IDS[number]

export const GAMEPASS_CONFIG: Record<GamepassID, Gamepass> = {
    88116412: "Equip More Pets",
    88116438: "Equip More Pets2",
    88116485: "Remove Hatch Cooldown",
}

export function getGamepassIDFromGamepass ( gamepass: Gamepass ) {
    for ( const [id, pass] of pairs( GAMEPASS_CONFIG ) ) {
        if (pass.gsub(" ", "")[0] === gamepass.gsub(" ", "")[0]) return id
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


export const DEV_PRODUCTS = ["100,000 Coins"] as const
export type DevProduct = typeof DEV_PRODUCTS[number]
export const DEV_PRODUCT_IDS = ["1317443894"] as const
export type DevProductID = typeof DEV_PRODUCT_IDS[number]

export const DEV_PRODUCT_CONFIG: Record<DevProductID, DevProduct> = {
    1317443894: "100,000 Coins",
}

export function getDevProductIDFromDevProduct ( devProduct: DevProduct ) {
    for ( const [id, product] of pairs( DEV_PRODUCT_CONFIG ) ) {
        if (product.gsub(" ", "")[0] === devProduct.gsub(" ", "")[0]) return id
    }
}
export function getDevProductFromID ( devProductID: DevProductID ) {
    for ( const [id, product] of pairs( DEV_PRODUCT_CONFIG ) ) {
        if (id.gsub(" ", "")[0] === devProductID.gsub(" ", "")[0]) return product
    }
}
