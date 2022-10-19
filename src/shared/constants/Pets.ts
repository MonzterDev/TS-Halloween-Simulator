import { PlayerData } from "shared/types/PlayerData"
import { BOOSTS_CONFIG } from "./Boosts"

export const DEFAULT_MAX_PET_STORAGE_AMOUNT = 50
export const DEFAULT_MAX_PET_EQUIPPED_AMOUNT = 5

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

export const EGGS = ["Halloween", "Spawn", "Camp"] as const
export type Egg = typeof EGGS[number]

export const PETS = ["Alien", "Ant", "Baby Bee", "Baby Slime", "Beast", "Blue Slime", "Crab", "Demon", "Devil", "Dino", "Dragoon", "Duck", "Elephant", "Fire Demon", "Fly", "Fox", "Ghost", "Ghost Dog", "Ghost Dragon", "Ghost Slime", "Kitty", "Monkey", "Mouse", "Penguin", "Piggy", "Purple Slime", "Red Slime", "Rhino", "Scorch", "Slime King", "Spider", "Void Angel", "Void Vampire", "Wolf", "Yellow Slime", "Zelot"] as const
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

// Devil, Ant, Ghost Dog, Spider
export const EGG_SHOP_CONFIG: Record<Egg, EggProps> = {
    Halloween: {
        price: 10,
        pets: {
            Spider: {chance: 40, rarity: "Common"},
            Ghost: {chance: 20, rarity: "Common"},
            "Ghost Dog": {chance: 10, rarity: "Rare"},
            "Ghost Dragon": {chance: 5, rarity: "Rare"},
            Devil: {chance: 2.5, rarity: "Rare"},
        }
    },

    Spawn: {
        price: 10,
        pets: {
            Alien: {chance: 40, rarity: "Common"},
            Wolf: {chance: 20, rarity: "Common"},
            Kitty: {chance: 10, rarity: "Uncommon"},
            Dragoon: {chance: 5, rarity: "Uncommon"},
        }
    },
    Camp: {
        price: 10,
        pets: {
            Mouse: {chance: 40, rarity: "Common"},
            Elephant: {chance: 20, rarity: "Common"},
            Ant: {chance: 10, rarity: "Uncommon"},
            Dino: {chance: 5, rarity: "Uncommon"},
            Crab: {chance: 2.5, rarity: "Uncommon"},
        }
    }
}

type PetProps = Record<Rarity, number>

const DEFAULT_PET_PROPS: PetProps = {
    Common: 1,
    Uncommon: 2,
    Rare: 3,
}

export const PET_CONFIG: Partial<Record<Pet, PetProps>> = {
    Spider: DEFAULT_PET_PROPS,
    Ghost: DEFAULT_PET_PROPS,
    "Ghost Dog": DEFAULT_PET_PROPS,
    "Ghost Dragon": DEFAULT_PET_PROPS,
    Devil: DEFAULT_PET_PROPS,

    Alien: DEFAULT_PET_PROPS,
    Wolf: DEFAULT_PET_PROPS,
    Kitty: DEFAULT_PET_PROPS,
    Dragoon: DEFAULT_PET_PROPS,

    Mouse: DEFAULT_PET_PROPS,
    Elephant: DEFAULT_PET_PROPS,
    Ant: DEFAULT_PET_PROPS,
    Dino: DEFAULT_PET_PROPS,
    Crab: DEFAULT_PET_PROPS,
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

// All Pets below 10% have increase chances to be spawned by the Egg Luck stat
export function getEggHatchChance ( chance: number, data: PlayerData ) {
    const luck = getEggLuckStat(data)
    if (chance < 10)  chance *= luck
    return chance
}

export function getEggLuckStat ( data: PlayerData ) {
    let amount = 1

    const boost = data.active_boosts.get( "Luck" )
    const rarity = boost?.rarity
    if ( rarity ) {
        const boostMultiplier = BOOSTS_CONFIG.Luck[rarity]
        amount += boostMultiplier
    }

    const hasGamepass = data.gamepasses.get( "Lucky Eggs" )
    amount += hasGamepass ? 1 : 0
    return amount
}