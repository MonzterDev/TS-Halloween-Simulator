import { RARITIES, Rarity } from "./Pets"

export const BOOST_DURATION = 10

export type BoostInventory = Map<Boost, Record<Rarity, number>>
export type ActiveBoosts = Map<Boost, {rarity: Rarity, duration: number}>

export const BOOST_DESCRIPTIONS: Record<Boost, string> = {
    Luck: "Egg Hatching Luck for 20mins!",
    Power: "Breaking Power for 20mins!"
}

export const BOOSTS = ["Luck", "Power"] as const
export type Boost = typeof BOOSTS[number]

type Multiplier = number

export const BOOSTS_CONFIG: Record<Boost, Record<Rarity, Multiplier>> = {
    Luck: {
        Common: 1,
        Uncommon: 1.5,
        Rare: 2,
    },
    Power: {
        Common: 1,
        Uncommon: 1.5,
        Rare: 2,
    }
}

export const BOOST_IMAGES: Record<Boost, string> = {
    Luck: "rbxassetid://129474314",
    Power: "rbxassetid://129474314"
}