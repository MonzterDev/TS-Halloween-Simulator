import { Settings } from "shared/types/PlayerData"

export const SETTINGS = ["Music", "Hide Others Pets", "Hide Currency Popup", "Tripple Hatch"] as const
export type Setting = typeof SETTINGS[number]

export const ON_BUTTON = "rbxassetid://10708452023"
export const OFF_BUTTON = "rbxassetid://10708452021"

export function getSettingAsProp ( setting: Setting ) {
    return <keyof Settings>setting.lower().gsub(" ", "_")[0]
}

// Use these as Player Data instead of the old ones