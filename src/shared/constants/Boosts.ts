import { Rarities } from "./Pets"

export const Boosts = ["Luck", "Power"] as const
export type Boosts = typeof Boosts[number]

type Multiplier = number

export const BoostsConfig: Record<Boosts, Record<Rarities, Multiplier>> = {
    Luck: {
        Common: 1,
        Uncommon: 1.5,
        Rare: 1.5,
    },
    Power: {
        Common: 1,
        Uncommon: 1.5,
        Rare: 1.5,
    }
}