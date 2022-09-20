import { Networking } from "@flamework/networking";
import { BasketUpgradeResponse, BasketUpgrades } from "./constants/Basket";
import { Currency } from "./constants/Currencies";
import { AreaTypes } from "./constants/Piles";
import { PlayerData } from "./types/PlayerData";

interface ServerEvents {
    sell: () => void
}

interface ServerFunctions {
    getData: <k extends keyof PlayerData>( data: k ) => PlayerData[k] | false
    getBasketUpgrade: <k extends keyof PlayerData["basket_upgrades"]>( data: k ) => number | false
    purchaseBasketUpgrade: ( upgrade: BasketUpgrades ) => BasketUpgradeResponse
}

interface ClientEvents {
    updatePileHealth: (uuid: string) => void
    updateCurrency: ( currency: Currency, amount: number ) => void

    displayBasketUpgradeShop: (area: AreaTypes) => void
    luckyReward: (amount: number) => void
}


interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
