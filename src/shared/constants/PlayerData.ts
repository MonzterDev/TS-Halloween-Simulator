import { PlayerData } from "../types/PlayerData";

export const DEFAULT_PLAYER_DATA: PlayerData = {
    candy: 0,
    candy_corn: 0,
    money: 10000,
    basket_upgrades: {
        size: 0,
        range: 0,
        power: 0,
        luck: 0
    },
    pet_inventory: new Map(),
    pet_info: {
        max_equipped: 3,
        max_stored: 50
    },
    gamepasses: {
        equip_more_pets: false,
        equip_more_pets2: false,
        remove_hatch_cooldown: false
    }
}