export const AREAS = ["Spawn", "Camp", "Crystal_Valley", "Swamp"]
export type Area = typeof AREAS[number]

export interface AreaWallProps {
    coin_price: number
    requirements?: Area
}

export type AreaWallConfig = Record<Area, AreaWallProps>

export const AREA_WALL_CONFIG: AreaWallConfig = {
    Spawn: {
        coin_price: 0
    },
    Camp: {
        coin_price: 100,
        requirements: "Spawn"
    },
    Crystal_Valley: {
        coin_price: 500,
        requirements: "Camp"
    },
    Swamp: {
        coin_price: 500,
        requirements: "Crystal_Valley"
    },
}




export interface AreaPileProps {
    health_multiplier: number
    reward_multiplier: number
}

export type AreaPileConfig = Record<Area, AreaPileProps>

export const AREA_PILE_CONFIG: AreaPileConfig = {
    Spawn: {
        health_multiplier: 1,
        reward_multiplier: 1,
    },
    Camp: {
        health_multiplier: 2,
        reward_multiplier: 2,
    },
    Crystal_Valley: {
        health_multiplier: 3,
        reward_multiplier: 3,
    },
    Swamp: {
        health_multiplier: 4,
        reward_multiplier: 4,
    },
}