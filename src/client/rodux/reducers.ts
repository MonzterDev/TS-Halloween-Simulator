import { Action, createReducer } from "@rbxts/rodux";
import { Gamepasses, PlayerData, Settings } from "shared/types/PlayerData";
import { DEFAULT_GIFTS_DATA, DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";
import { Egg, EGGS, Pet, PetInstanceProps, PETS, RARITIES, Rarity, UUID } from "shared/constants/Pets";
import { getSettingAsProp, Setting, SETTINGS } from "shared/constants/Settings";
import { Gamepass, getGamepassAsProp } from "shared/constants/Monetization";
import { Boost, BOOSTS, BOOST_DURATION } from "shared/constants/Boosts";
import { Area } from "shared/constants/Areas";
import { Quest } from "shared/constants/Quests";
import { Code } from "shared/constants/Codes";

interface UpdateDataAction extends Action<"updatePlayerData"> {
	data: DataState;
}
interface UpdateCurrencyAction extends Action<"updateCurrency"> {
    amount: number
    currency: ExtractKeys<PlayerData, number>
}
interface UpdateUpgradeAction extends Action<"updateUpgrade"> {
    amount: number
    upgrade: keyof PlayerData["basket_upgrades"]
}
interface AddPetAction extends Action<"addPet"> {
    uuid: UUID
    props: PetInstanceProps
}
interface RemovePetAction extends Action<"removePet"> {
    uuid: UUID
}
interface UpdatePetAction extends Action<"updatePet"> {
    uuid: UUID
    locked?: boolean
    equipped?: boolean
}
interface UpdateAutoDeletePetAction extends Action<"updateAutoDeletePet"> {
    egg: Egg
    pet: Pet
}
interface IndexPetAction extends Action<"indexPet"> {
    egg: Egg
    pet: Pet
}
interface UpdateSettingAction extends Action<"updateSetting"> {
    setting: Setting
    value: boolean
}
interface UpdateGamepassAction extends Action<"updateGamepass"> {
    gamepass: Gamepass
}
interface AddBoostAction extends Action<"addBoost"> {
    boost: Boost,
    rarity: Rarity
}
interface RemoveBoostAction extends Action<"removeBoost"> {
    boost: Boost,
    rarity: Rarity
}

// Active Boosts
interface UseBoostAction extends Action<"useBoost"> {
    boost: Boost,
    rarity: Rarity
}
interface UpdateBoostAction extends Action<"updateBoost"> {
    boost: Boost,
    duration: number
}
interface EndBoostAction extends Action<"endBoost"> {
    boost: Boost,
}
interface UnlockAreaAction extends Action<"unlockArea"> {
    area: Area,
}
interface UpdateQuestPointsAction extends Action<"updateQuestPoints"> {
    quest: Quest,
    tier: number,
    points: number
}
interface CompleteQuestAction extends Action<"completeQuest"> {
    quest: Quest,
    tier: number,
}
interface ClaimQuestAction extends Action<"claimQuest"> {
    quest: Quest,
    tier: number,
}

interface UpdateGiftPlayDurationAction extends Action<"updateGiftPlayDuration"> {
    amount: number,
}
interface UpdateGiftResetTimeAction extends Action<"updateGiftResetTime"> {
    amount: number,
}
interface ResetGiftsAction extends Action<"resetGifts"> {
}
interface ClaimGiftAction extends Action<"claimGift"> {
    gift: number
}

interface UpdateCodeAction extends Action<"updateCode"> {
    code: Code
}

interface UpdateGroupChestAction extends Action<"updateGroupChest"> {
    claimed?: boolean
    reset_time?: number
}

interface IncreaseEggPityAction extends Action<"increaseEggPity"> {
    egg: Egg
}
interface ResetEggPityAction extends Action<"resetEggPity"> {
    egg: Egg
}

export type DataState = PlayerData;
export type DataActions = UpdateDataAction | UpdateCurrencyAction | UpdateUpgradeAction | AddPetAction | RemovePetAction | UpdatePetAction | UpdateSettingAction | UpdateGamepassAction | AddBoostAction | RemoveBoostAction | UseBoostAction | UpdateBoostAction | EndBoostAction | UnlockAreaAction |UpdateQuestPointsAction | CompleteQuestAction | ClaimQuestAction | UpdateGiftPlayDurationAction | UpdateGiftResetTimeAction | ResetGiftsAction | ClaimGiftAction | UpdateAutoDeletePetAction | UpdateCodeAction | IndexPetAction | UpdateGroupChestAction | IncreaseEggPityAction | ResetEggPityAction;

export const dataReducer = createReducer<DataState, DataActions>(DEFAULT_PLAYER_DATA, {
    updatePlayerData: ( state, action ) => action.data,
    updateCurrency: ( state, action ) => {
        state[action.currency] = action.amount
        return state
    },
    updateUpgrade: ( state, action ) => {
        state.basket_upgrades[action.upgrade] = action.amount
        return state
    },

    addPet: ( state, action ) => {
        state.pet_inventory.set( action.uuid, action.props )
        return state
    },
    removePet: ( state, action ) => {
        state.pet_inventory.delete( action.uuid)
        return state
    },
    updatePet: ( state, action ) => {
        const pet = state.pet_inventory.get( action.uuid )
        if ( action.equipped !== undefined ) pet!.equipped = action.equipped
        if ( action.locked !== undefined ) pet!.locked = action.locked
        return state
    },
    updateSetting: ( state, action ) => {
        state.settings[<keyof Settings>getSettingAsProp(action.setting)] = action.value
        return state
    },
    updateGamepass: ( state, action ) => {
        state.gamepasses.set(action.gamepass, true)
        return state
    },
    addBoost: ( state, action ) => {
        state.boost_inventory.get(action.boost)![action.rarity] += 1
        return state
    },
    removeBoost: ( state, action ) => {
        state.boost_inventory.get(action.boost)![action.rarity] -= 1
        return state
    },
    useBoost: ( state, action ) => {
        state.active_boosts.set(action.boost, {rarity: action.rarity, duration: BOOST_DURATION})
        return state
    },
    updateBoost: ( state, action ) => {
        state.active_boosts.get(action.boost)!.duration = action.duration
        return state
    },
    endBoost: ( state, action ) => {
        state.active_boosts.delete(action.boost)
        return state
    },
    unlockArea: ( state, action ) => {
        state.areas_unlocked[action.area] = true
        return state
    },
    updateQuestPoints: ( state, action ) => {
        state.quests[action.quest][action.tier].points = action.points
        return state
    },
    completeQuest: ( state, action ) => {
        state.quests[action.quest][action.tier].completed = true
        return state
    },
    claimQuest: ( state, action ) => {
        state.quests[action.quest][action.tier].claimed_reward = true
        return state
    },
    updateGiftPlayDuration: ( state, action ) => {
        state.gift_time_played = action.amount
        return state
    },
    updateGiftResetTime: ( state, action ) => {
        state.gift_reset_time = action.amount
        return state
    },
    resetGifts: ( state, action ) => {
        state.gifts = DEFAULT_GIFTS_DATA
        return state
    },
    claimGift: ( state, action ) => {
        state.gifts[action.gift] = true
        return state
    },
    updateAutoDeletePet: ( state, action ) => {
        const isUnlocked = state.pet_auto_delete.get(action.egg)?.get(action.pet)
        state.pet_auto_delete.get(action.egg)?.set(action.pet, !isUnlocked)
        return state
    },
    updateCode: ( state, action ) => {
        state.codes.set(action.code, true)
        return state
    },
    indexPet: ( state, action ) => {
        state.pet_index.get(action.egg)?.set(action.pet, true)
        return state
    },
    updateGroupChest: ( state, action ) => {
        if (action.claimed) state.group_chest.claimed = action.claimed
        if (action.reset_time) state.group_chest.reset_time = action.reset_time
        return state
    },
    increaseEggPity: ( state, action ) => {
        state.pet_egg_pity.set(action.egg, state.pet_egg_pity.get(action.egg)! + 1)
        return state
    },
    resetEggPity: ( state, action ) => {
        state.pet_egg_pity.set(action.egg, 0)
        return state
    },
} );