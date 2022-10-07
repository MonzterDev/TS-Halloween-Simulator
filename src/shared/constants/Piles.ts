import { Area } from "./Areas"

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