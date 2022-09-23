import { Action, createReducer } from "@rbxts/rodux";
import { PlayerData, Settings } from "shared/types/PlayerData";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";
import { PetInstanceProps, UUID } from "shared/constants/Pets";
import { getSettingAsProp, Setting } from "shared/constants/Settings";

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

export type DataState = PlayerData;
export type DataActions = UpdateDataAction | UpdateCurrencyAction | UpdateUpgradeAction | AddPetAction | RemovePetAction | UpdatePetAction | UpdateSettingAction;

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
} );