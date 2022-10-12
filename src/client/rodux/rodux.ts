import { combineReducers, Store } from "@rbxts/rodux";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { Events, Functions } from "client/network";
import { BOOST_DURATION } from "shared/constants/Boosts";
import { PlayerData } from "shared/types/PlayerData";
import { isA } from "shared/util/functions/isA";
import { DataActions, dataReducer, DataState } from "./reducers";

export interface CombinedState {
	data: DataState;
}

const combinedReducer = combineReducers<CombinedState, DataActions>({
	data: dataReducer,
});

let isDataLoaded = false
export const clientStore = new Store( combinedReducer );

Events.updateCurrency.connect( ( currency, amount ) => clientStore.dispatch( { type: "updateCurrency", currency: currency, amount: amount } ) )
Events.givePet.connect( ( uuid, props ) => clientStore.dispatch( { type: "addPet", uuid: uuid, props: props } ) )
Events.deletePet.connect((uuid) => clientStore.dispatch( { type: "removePet", uuid: uuid }))
Events.unequipPet.connect( (player, uuid) => {
	if ( player !== Players.LocalPlayer ) return
	clientStore.dispatch( { type: "updatePet", uuid: uuid, equipped: false })
})
Events.equipPet.connect( (player, uuid) => {
	if ( player !== Players.LocalPlayer ) return
	clientStore.dispatch( { type: "updatePet", uuid: uuid, equipped: true })
})
Events.lockPet.connect( (uuid) => clientStore.dispatch( { type: "updatePet", uuid: uuid, locked: true }))
Events.unlockPet.connect( (uuid) => clientStore.dispatch( { type: "updatePet", uuid: uuid, locked: false }))
Events.toggleSetting.connect( ( setting, value ) => clientStore.dispatch( { type: "updateSetting", setting: setting, value: value } ) )

Events.updateGamepass.connect( ( gamepass ) => clientStore.dispatch({type: "updateGamepass", gamepass: gamepass}) )
Events.gainBoost.connect( ( boost, rarity ) => clientStore.dispatch({type: "addBoost", boost: boost, rarity: rarity}) )
Events.useBoost.connect( ( boost, rarity ) => {
	clientStore.dispatch( { type: "removeBoost", boost: boost, rarity: rarity } )
	clientStore.dispatch( { type: "useBoost", boost: boost, rarity: rarity, duration: BOOST_DURATION } )
} )
Events.unlockArea.connect( ( area ) => clientStore.dispatch( { type: "unlockArea", area: area } ) )

Events.updateQuestPoints.connect( ( quest, tier, points ) => clientStore.dispatch({type: "updateQuestPoints", quest: quest, tier: tier, points: points}) )
Events.completeQuest.connect( ( quest, tier ) => clientStore.dispatch({type: "completeQuest", quest: quest, tier: tier}) )
Events.claimQuest.connect( ( quest, tier ) => clientStore.dispatch( { type: "claimQuest", quest: quest, tier: tier } ) )

Events.claimGift.connect( ( gift ) => clientStore.dispatch({type: "claimGift", gift: gift }) )
Events.updateGiftPlayDuration.connect( ( amount ) => clientStore.dispatch({type: "updateGiftPlayDuration", amount: amount}) )
Events.updateGiftResetTime.connect( ( time ) => clientStore.dispatch({type: "updateGiftResetTime", amount: time}) )
Events.resetGifts.connect( ( ) => clientStore.dispatch({type: "resetGifts"}) )