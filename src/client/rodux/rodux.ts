import { combineReducers, Store } from "@rbxts/rodux";
import { Events } from "client/network";
import { DataActions, dataReducer, DataState } from "./reducers";

export interface CombinedState {
	data: DataState;
}

const combinedReducer = combineReducers<CombinedState, DataActions>({
	data: dataReducer,
});

export const clientStore = new Store( combinedReducer );

Events.updateCurrency.connect( ( currency, amount ) => clientStore.dispatch({type: "updateCurrency", currency: currency, amount: amount}) )