import { Area } from "shared/constants/Areas";
import { BasketUpgrade } from "shared/constants/Basket";
import { ActiveBoosts, BoostInventory } from "shared/constants/Boosts";
import { Code } from "shared/constants/Codes";
import { GiftTime } from "shared/constants/Gifts";
import { Gamepass } from "shared/constants/Monetization";
import { Egg, EGGS, Pet, PetInventory, PETS } from "shared/constants/Pets";
import { Quest } from "shared/constants/Quests";
import { Setting } from "shared/constants/Settings";

export interface PlayerData {
	candy: number;
	candy_corn: number;
	money: number;
	basket_upgrades: BasketUpgradesData
	pet_inventory: PetInventory
	pet_index: PetIndexData
	pet_auto_delete: PetAutoDeleteData
	pet_egg_pity: PetEggPityData
	active_boosts: ActiveBoosts
	boost_inventory: BoostInventory
	gamepasses: GamepassesData
	settings: SettingsData
	analytics: Analytics
	areas_unlocked: AreasUnlockedData
	quests: QuestData
	gift_time_played: number
	gift_reset_time: number
	gifts: GiftData
	codes: CodeData
	group_chest: GroupChestProps
}

export interface GroupChestProps {
	claimed: boolean,
	reset_time: number,
}

export type BasketUpgradesData = Record<BasketUpgrade, number>

export interface Gamepasses {
	equip_more_pets: boolean
	equip_more_pets2: boolean
	remove_hatch_cooldown: boolean
	tripple_hatch: boolean
}

export interface Analytics {
	gamepasses_purchased: number
	dev_products_purchased: number
}

export type AreasUnlockedData = Record<Area, boolean>

export type QuestDataLevels = Record<number, {
	points: number
	completed: boolean
	claimed_reward: boolean
}>
export type QuestData = Record<Quest, QuestDataLevels>

export type GiftData = Record<GiftTime, boolean>

export type PetAutoDeleteData = Map<Egg, Map<Partial<Pet>, boolean>>

export type CodeData = Map<Code, boolean>

export type PetIndexData = Map<Egg, Map<Pet, boolean>>
export type PetEggPityData = Map<Egg, number>

export type GamepassesData = Map<Gamepass, boolean>
export type SettingsData = Map<Setting, boolean>