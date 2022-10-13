import { Area } from "./Areas"

export const PILE_SIZES = ["Small", "Medium", "Large"]
export type PileSize = typeof PILE_SIZES[number]

export interface PileProperties {
    health: number,
}

export type PilesConfig = Record<PileSize, PileProperties>

export const PILES_CONFIG: PilesConfig = {
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