import { Action, createReducer } from "@rbxts/rodux";
import { Gamepasses, PlayerData, Settings } from "shared/types/PlayerData";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";
import { PetInstanceProps, Rarities, UUID } from "shared/constants/Pets";
import { getSettingAsProp, Setting } from "shared/constants/Settings";
import { Gamepass, getGamepassAsProp } from "shared/constants/Gamepasses";
import { Boosts, BOOST_DURATION } from "shared/constants/Boosts";

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
interface UpdateSettingAction extends Action<"updateSetting"> {
    setting: Setting
    value: boolean
}
interface UpdateGamepassAction extends Action<"updateGamepass"> {
    gamepass: Gamepass
}
interface AddBoostAction extends Action<"addBoost"> {
    boost: Boosts,
    rarity: Rarities
}
interface RemoveBoostAction extends Action<"removeBoost"> {
    boost: Boosts,
    rarity: Rarities
}

// Active Boosts
interface UseBoostAction extends Action<"useBoost"> {
    boost: Boosts,
    rarity: Rarities
}
interface UpdateBoostAction extends Action<"updateBoost"> {
    boost: Boosts,
    duration: number
}
interface EndBoostAction extends Action<"endBoost"> {
    boost: Boosts,
}

export type DataState = PlayerData;
export type DataActions = UpdateDataAction | UpdateCurrencyAction | UpdateUpgradeAction | AddPetAction | RemovePetAction | UpdatePetAction | UpdateSettingAction | UpdateGamepassAction | AddBoostAction | RemoveBoostAction | UseBoostAction | UpdateBoostAction | EndBoostAction;

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
        state.gamepasses[<keyof Gamepasses>getGamepassAsProp(action.gamepass)] = true
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
} );