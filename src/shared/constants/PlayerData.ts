import { PlayerData } from "../types/PlayerData";
import { BoostInventory, Boosts } from "./Boosts";
import { Rarities } from "./Pets";

const DEFAULT_BOOSTS: BoostInventory = new Map()
Boosts.forEach( ( boost ) => {
    const rarityTable: Record<Rarities, number> = {
        Common: 0,
        Uncommon: 0,
        Rare: 0,
    }
    DEFAULT_BOOSTS.set(boost, rarityTable)
})

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
    active_boosts: new Map(),
    boost_inventory: DEFAULT_BOOSTS,
    gamepasses: {
        equip_more_pets: false,
        equip_more_pets2: false,
        remove_hatch_cooldown: false,
        tripple_hatch: false,
    },
    settings: {
        music: true,
        hide_others_pets: false,
        hide_currency_popup: false,
        tripple_hatch: false
    },
    analytics: {
        dev_products_purchased: 0,
        gamepasses_purchased: 0
    }
}