import { Action, createReducer } from "@rbxts/rodux";
import { PlayerData } from "shared/types/PlayerData";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";

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

export type DataState = PlayerData;
export type DataActions = UpdateDataAction | UpdateCurrencyAction | UpdateUpgradeAction;

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
} );


