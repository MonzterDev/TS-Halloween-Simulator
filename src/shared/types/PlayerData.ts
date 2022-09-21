import { PetInventory } from "shared/constants/Pets";

export interface PlayerData {
	candy: number;
	candy_corn: number;
	money: number;
	basket_upgrades: BasketUpgrades
	pet_inventory: PetInventory
}

export interface BasketUpgrades {
	size: number
	range: number
	power: number
	luck: number
}