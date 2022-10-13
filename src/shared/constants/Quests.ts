import { QuestDataLevels } from "shared/types/PlayerData"
import { Boosts } from "./Boosts"
import { CURRENCIES, Currency } from "./Currencies"
import { Rarities } from "./Pets"

export interface BoosterQuestRewardProps {
    rarity: Rarities
    amount: number
}
export type Reward = Record<Currency, number>
export type Reward2 = Record<Boosts, BoosterQuestRewardProps>
export type Rewards = Partial<Reward> | Partial<Reward2>

export const QUESTS = ["Candy Collector", "Explorer"]
export type Quest = typeof QUESTS[number]

export type QuestRewardProps = Record<number, Rewards>

export interface QuestConfigProps {
    description: string
    tiers: number
    points_per_tier: number
    reward: QuestRewardProps
}

export type QuestConfig = Record<Quest, QuestConfigProps>

export const QuestConfig: QuestConfig = {
    "Candy Collector": {
        description: "Collect REPLACE pieces of Candy!",
        tiers: 5,
        points_per_tier: 100,
        reward: {
            1: {"Luck": { amount: 2, rarity: "Common" }, "candy": 100},
            2: {"candy": 100},
            3: {"candy": 100},
            4: {"candy": 100},
            5: {"candy": 100},
        }
    }
}

export function getActiveQuestTier ( questDataLevels: QuestDataLevels ): number {
    let lastCompleted: number = 0
    for ( const [level, props] of pairs( questDataLevels ) ) {
        if ( props.completed ) lastCompleted = level
        else break
    }

    return lastCompleted! + 1
}