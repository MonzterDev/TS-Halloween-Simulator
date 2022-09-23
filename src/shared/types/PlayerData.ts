import { PetInventory } from "shared/constants/Pets";

export interface PlayerData {
	candy: number;
	candy_corn: number;
	money: number;
	basket_upgrades: BasketUpgrades
	pet_inventory: PetInventory
	pet_info: PetInfo
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