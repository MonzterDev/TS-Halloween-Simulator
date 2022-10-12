import { isA } from "shared/util/functions/isA";
import { AreasUnlocked, GiftData, PetAutoDeleteData, PlayerData, QuestData } from "../types/PlayerData";
import { BoostInventory, Boosts } from "./Boosts";
import { GiftConfig } from "./Gifts";
import { EggShopConfig, PetTypes, Rarities } from "./Pets";
import { QuestConfig } from "./Quests";

const DEFAULT_BOOSTS: BoostInventory = new Map()
Boosts.forEach( ( boost ) => {
    const rarityTable: Record<Rarities, number> = {
        Common: 0,
        Uncommon: 0,
        Rare: 0,
    }
    DEFAULT_BOOSTS.set(boost, rarityTable)
} )

const DEFAULT_QUESTS_DATA: QuestData = {}
for ( const [quest, props] of pairs( QuestConfig ) ) {
    DEFAULT_QUESTS_DATA[quest] = {}

    let i = 1
    while ( i <= props.tiers ) {
        DEFAULT_QUESTS_DATA[quest][i] = {
            points: 0,
            completed: false,
            claimed_reward: false,
        }
        i++
    }
}

export const DEFAULT_GIFTS_DATA: GiftData = {}
for ( const [giftTime, reward] of pairs( GiftConfig ) ) {
    DEFAULT_GIFTS_DATA[giftTime] = false
}

export const DEFAULT_PET_AUTO_DELETE_DATA: PetAutoDeleteData = new Map()
for ( const [egg, props] of pairs( EggShopConfig ) ) {
    DEFAULT_PET_AUTO_DELETE_DATA.set(egg, new Map())
    for ( const [pet, prop] of pairs( props.pets ) ) DEFAULT_PET_AUTO_DELETE_DATA.get(egg)?.set(pet, false)
}

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
    pet_inventory: new Map(
        // [
        //     ["UDAWD", { type: "Dog", rarity: "Rare", equipped: true }],
        //     ["Awd", { type: "Cat", rarity: "Uncommon", equipped: false, locked: true }],
        // ]
    ),
    pet_auto_delete: DEFAULT_PET_AUTO_DELETE_DATA,
    active_boosts: new Map(
        // [
        //     ["Luck", {rarity: "Common", duration: 10}],
        //     ["Power", {rarity: "Rare", duration: 60}],
        // ]
    ),
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
    },
    areas_unlocked: {
        Spawn: true,
        Camp: false,
        Crystal_Valley: false,
        Swamp: false
    },
    quests: DEFAULT_QUESTS_DATA,
    gift_time_played: 0,
    gift_reset_time: os.time() + 86400,
    gifts: DEFAULT_GIFTS_DATA
}

// Mock test data
//
// export const DEFAULT_PLAYER_DATA: PlayerData = {
//     candy: 0,
//     candy_corn: 0,
//     money: 10000,
//     basket_upgrades: {
//         size: 0,
//         range: 0,
//         power: 0,
//         luck: 0
//     },
//     pet_inventory: new Map(
//         [
//             ["UDAWD", { type: "Dog", rarity: "Rare", equipped: true }],
//             ["Awd", { type: "Cat", rarity: "Uncommon", equipped: false, locked: true }],
//         ]
//     ),
//     active_boosts: new Map(
//         [
//             ["Luck", {rarity: "Common", duration: 10}],
//             ["Power", {rarity: "Rare", duration: 60}],
//         ]
//     ),
//     boost_inventory: DEFAULT_BOOSTS,
//     gamepasses: {
//         equip_more_pets: false,
//         equip_more_pets2: false,
//         remove_hatch_cooldown: false,
//         tripple_hatch: false,
//     },
//     settings: {
//         music: true,
//         hide_others_pets: false,
//         hide_currency_popup: false,
//         tripple_hatch: false
//     },
//     analytics: {
//         dev_products_purchased: 0,
//         gamepasses_purchased: 0
//     },
//     areas_unlocked: {
//         Spawn: true,
//         Camp: true,
//         Crystal_Valley: false,
//         Swamp: false
//     }
// }