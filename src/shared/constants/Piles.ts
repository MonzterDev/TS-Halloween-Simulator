
export const PileTypes = ["Small", "Medium", "Large"]
export type PileTypes = typeof PileTypes[number]

export interface PileProperties {
    health: number,
}

export type PilesConfig = Record<PileTypes, PileProperties>

export const PilesConfig: PilesConfig = {
    "Small": {
        health: 10,
    },
    "Medium": {
        health: 15,
    },
    "Large": {
        health: 25,
    },
}

export const AreaTypes = ["Spawn", "Snow", "Grass"]
export type AreaTypes = typeof AreaTypes[number]

export interface AreaProperties {
    health_multiplier: number
    reward_multiplier: number
}

export type AreasConfig = Record<AreaTypes, AreaProperties>

export const AreasConfig: AreasConfig = {
    "Spawn": {
        health_multiplier: 1,
        reward_multiplier: 1,
    },
    "Snow": {
        health_multiplier: 2,
        reward_multiplier: 2,
    },
    "Grass": {
        health_multiplier: 3,
        reward_multiplier: 3,
    },
}