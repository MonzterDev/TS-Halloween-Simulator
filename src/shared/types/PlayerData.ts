import { PetInventory } from "shared/constants/Pets";

export interface PlayerData {
	candy: number;
	candy_corn: number;
	money: number;
	basket_upgrades: BasketUpgrades
	pet_inventory: PetInventory
	pet_info: PetInfo
	gamepasses: Gamepasses
}

interface PetInfo {
	max_stored: number
	max_equipped: number
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
}