import { Settings } from "shared/types/PlayerData"

export const Setting = ["Music", "Hide Others Pets", "Hide Currency Popup", "Tripple Hatch"] as const
export type Setting = typeof Setting[number]

export const ON_BUTTON = "rbxassetid://10708452023"
export const OFF_BUTTON = "rbxassetid://10708452021"

export function getSettingAsProp ( setting: Setting ) {
    return <keyof Settings>setting.lower().gsub(" ", "_")[0]
}