import { Area } from "shared/constants/Areas";
import { ActiveBoosts, BoostInventory } from "shared/constants/Boosts";
import { GiftTime } from "shared/constants/Gifts";
import { PetInventory } from "shared/constants/Pets";
import { Quest } from "shared/constants/Quests";

export interface PlayerData {
	candy: number;
	candy_corn: number;
	money: number;
	basket_upgrades: BasketUpgrades
	pet_inventory: PetInventory
	active_boosts: ActiveBoosts
	boost_inventory: BoostInventory
	gamepasses: Gamepasses
	settings: Settings
	analytics: Analytics
	areas_unlocked: AreasUnlocked
	quests: QuestData
	gift_time_played: number
	gift_reset_time: number
	gifts: GiftData
}

export interface BasketUpgrades {
	size: number
	range: number
	power: number
	luck: number
}

export interface Gamepasses {
	equip_more_pets: boolean
	equip_more_pets2: boolean
	remove_hatch_cooldown: boolean
	tripple_hatch: boolean,
}

export interface Settings {
	music: boolean
	hide_others_pets: boolean
	hide_currency_popup: boolean
	tripple_hatch: boolean
}

export interface Analytics {
	gamepasses_purchased: number
	dev_products_purchased: number
}

export type AreasUnlocked = Record<Area, boolean>

export type QuestDataLevels = Record<number, {
	points: number
	completed: boolean
	claimed_reward: boolean
}>
export type QuestData = Record<Quest, QuestDataLevels>

export type GiftData = Record<GiftTime, boolean>
