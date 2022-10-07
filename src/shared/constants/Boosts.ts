import { Rarities } from "./Pets"

export const BOOST_DURATION = 10

export type BoostInventory = Map<Boosts, Record<Rarities, number>>
export type ActiveBoosts = Map<Boosts, {rarity: Rarities, duration: number}>

export const BOOST_DESCRIPTIONS: Record<Boosts, string> = {
    Luck: "Egg Hatching Luck for 20mins!",
    Power: "Breaking Power for 20mins!"
}

export const Boosts = ["Luck", "Power"] as const
export type Boosts = typeof Boosts[number]

type Multiplier = number

export const BoostsConfig: Record<Boosts, Record<Rarities, Multiplier>> = {
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

export const BOOST_IMAGES: Record<Boosts, string> = {
    Luck: "rbxassetid://129474314",
    Power: "3610692290://129474314"
}