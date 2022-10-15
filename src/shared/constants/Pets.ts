import { PlayerData } from "shared/types/PlayerData"

export const DEFAULT_MAX_PET_STORAGE_AMOUNT = 50
export const DEFAULT_MAX_PET_EQUIPPED_AMOUNT = 3

export interface PetInstanceProps {
    type: Pet
    rarity: Rarity
    locked?: boolean
    equipped?: boolean
}

export type PetInventory = Map<UUID, PetInstanceProps>

export const RARITIES = ["Common", "Uncommon", "Rare"] as const
export type Rarity = typeof RARITIES[number]

export const RARITY_COLORS: Record<Rarity, Color3> = {
    Common: Color3.fromRGB(191,191,191),
    Uncommon: Color3.fromRGB(28,179,23),
    Rare: Color3.fromRGB(51,222,227),
}

export const EGGS = ["Starter"] as const
export type Egg = typeof EGGS[number]

export const PETS = ["Dog", "Cat"] as const
export type Pet = typeof PETS[number]

export type Power = number
export type Chance = number
export type UUID = string

interface Props {
    chance: number
    rarity: Rarity
}

export type EggPetProps = Partial<Record<Pet, Props>>

interface EggProps {
    price: number,
    pets: EggPetProps
}


export const EGG_SHOP_CONFIG: Record<Egg, EggProps> = {
    Starter: {
        price: 10,
        pets: {
            Dog: {chance: 1, rarity: "Common"},
            Cat: {chance: 5, rarity: "Uncommon"},
        }
    }
}

type PetProps = Record<Rarity, number>

export const PET_CONFIG: Record<Pet, PetProps> = {
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

export function getMaxPetsEquipped (data: PlayerData) {
    let total = DEFAULT_MAX_PET_EQUIPPED_AMOUNT
    if (data.gamepasses.get("Equip 2 More Pets")) total += 2
    if ( data.gamepasses.get("Equip 5 More Pets") ) total += 5
    return total
}

export function getMaxPetsStored (data: PlayerData) {
    let total = DEFAULT_MAX_PET_STORAGE_AMOUNT
    if (data.gamepasses.get("100 Pet Storage")) total += 100
    if ( data.gamepasses.get("500 Pet Storage") ) total += 500
    return total
}
