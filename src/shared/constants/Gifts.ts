import { Rewards } from "./Quests"

export const GIFT_TIME_MINUTES = [ 5, 10, 15, 30, 60, 75, 90, 120, 150, 180, 200, 240 ]
export type GiftTime = typeof GIFT_TIME_MINUTES[number]

export type GiftConfig = Record<GiftTime, Rewards>

export const GIFT_CONFIG: GiftConfig = {
    5: { candy: 100 },
    10: { Luck: { amount: 1, rarity: "Common" } },
}