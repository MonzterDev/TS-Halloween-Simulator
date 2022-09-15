export const CURRENCIES = ["candy", "money", "candy_corn"] as const
export type Currency = typeof CURRENCIES[number]