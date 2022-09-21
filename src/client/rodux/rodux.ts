import { combineReducers, Store } from "@rbxts/rodux";
import { Events, Functions } from "client/network";
import { PlayerData } from "shared/types/PlayerData";
import { isA } from "shared/util/functions/isA";
import { DataActions, dataReducer, DataState } from "./reducers";

export interface CombinedState {
	data: DataState;
}

const combinedReducer = combineReducers<CombinedState, DataActions>({
	data: dataReducer,
});

export const clientStore = new Store( combinedReducer );

Events.updateCurrency.connect( ( currency, amount ) => clientStore.dispatch( { type: "updateCurrency", currency: currency, amount: amount } ) )
Events.givePet.connect( ( uuid, props ) => clientStore.dispatch( { type: "addPet", uuid: uuid, props: props } ) )
Events.deletePet.connect((uuid) => clientStore.dispatch( { type: "removePet", uuid: uuid }))

Functions.getAllData.invoke().andThen( ( data ) => {
	if (isA<PlayerData>(data)) clientStore.dispatch({type: "updatePlayerData", data: data})
})