import { Rewards } from "./Quests"

export const CODES = ["TEST1", "TWITTER"]
export type Code = typeof CODES[number]

export interface CodeConfigProps {
    expiration: number
    reward: Rewards
}

export type CodeConfig = Record<Code, CodeConfigProps>

export const CODES_CONFIG: CodeConfig = {
    TEST1: {
        expiration: 1665806400,
        reward: { candy: 100 },
    },
    TWITTER: {
        expiration: 1665547200,
        reward: { candy: 100 },
    },
}