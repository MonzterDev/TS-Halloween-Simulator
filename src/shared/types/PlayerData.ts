import { PetInventory } from "shared/constants/Pets";

export interface PlayerData {
	candy: number;
	candy_corn: number;
	money: number;
	basket_upgrades: BasketUpgrades
	pet_inventory: PetInventory
	gamepasses: Gamepasses
	settings: Settings
	analytics: Analytics
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
