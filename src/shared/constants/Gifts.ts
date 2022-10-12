import { QuestDataLevels } from "shared/types/PlayerData"
import { Boosts } from "./Boosts"
import { Currency } from "./Currencies"
import { Rarities } from "./Pets"

export interface BoosterQuestRewardProps {
    rarity: Rarities
    amount: number
}
export type Reward = Record<Currency, number>
export type Reward2 = Record<Boosts, BoosterQuestRewardProps>

export const GIFT_TIME_MINUTES = [ 5, 10, 15, 30, 60, 75, 90, 120, 150, 180, 200, 240 ]
export type GiftTime = typeof GIFT_TIME_MINUTES[number]

export type GiftConfig = Record<GiftTime, Partial<Reward> | Partial<Reward2>>

export const GiftConfig: GiftConfig = {
    5: { candy: 100 },
    10: { Luck: { amount: 1, rarity: "Common" } },
}


export function getActiveQuestTier ( questDataLevels: QuestDataLevels ): number {
    let lastCompleted: number = 0
    for ( const [level, props] of pairs( questDataLevels ) ) {
        if ( props.completed ) lastCompleted = level
        else break
    }

    return lastCompleted! + 1
}