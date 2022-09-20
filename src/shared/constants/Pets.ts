
interface PetInstanceProps {
    type: PetTypes
    rarity: Rarities
}
export type PetInstance = Record<UUID, PetInstanceProps>

export const Rarities = ["Common", "Uncommon", "Rare"] as const
export type Rarities = typeof Rarities[number]

export const EggTypes = ["Starter"] as const
export type EggTypes = typeof EggTypes[number]

export const PetTypes = ["Dog", "Cat"] as const
export type PetTypes = typeof PetTypes[number]

export type Power = number
export type Chance = number
export type UUID = number

type PetEggProps = Partial<Record<PetTypes, Chance>>

interface EggProps {
    price: number,
    pets: PetEggProps
}


export const EggShopConfig: Record<EggTypes, EggProps> = {
    Starter: {
        price: 10,
        pets: {
            Dog: 1,
            Cat: 5,
        }
    }
}

type PetProps = Record<Rarities, number>

export const PetConfig: Record<PetTypes, PetProps> = {
    Dog: {
        Common: 1,
        Uncommon: 2,
        Rare: 3,
    },
    Cat: {
        Common: 2,
        Uncommon: 3,
        Rare: 4,
    },
}