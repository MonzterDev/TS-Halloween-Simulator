export const DEFAULT_MAX_PET_STORAGE_AMOUNT = 50
export const DEFAULT_MAX_PET_EQUIPPED_AMOUNT = 3

export interface PetInstanceProps {
    type: PetTypes
    rarity: Rarities
    locked?: boolean
    equipped?: boolean
}

export type PetInventory = Map<UUID, PetInstanceProps>

export const Rarities = ["Common", "Uncommon", "Rare"] as const
export type Rarities = typeof Rarities[number]

export const RarityColors: Record<Rarities, Color3> = {
    Common: Color3.fromRGB(191,191,191),
    Uncommon: Color3.fromRGB(28,179,23),
    Rare: Color3.fromRGB(51,222,227),
}

export const EggTypes = ["Starter"] as const
export type EggTypes = typeof EggTypes[number]

export const PetTypes = ["Dog", "Cat"] as const
export type PetTypes = typeof PetTypes[number]

export type Power = number
export type Chance = number
export type UUID = string

interface Props {
    chance: number
    rarity: Rarities
}

export type EggPetProps = Partial<Record<PetTypes, Props>>

interface EggProps {
    price: number,
    pets: EggPetProps
}


export const EggShopConfig: Record<EggTypes, EggProps> = {
    Starter: {
        price: 10,
        pets: {
            Dog: {chance: 1, rarity: "Common"},
            Cat: {chance: 5, rarity: "Uncommon"},
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