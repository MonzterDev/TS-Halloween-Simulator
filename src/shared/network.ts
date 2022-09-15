import { Networking } from "@flamework/networking";
import { Currency } from "./constants/Currencies";
import { PlayerData } from "./types/PlayerData";

interface ServerEvents {}

interface ServerFunctions {
    getData: <k extends keyof PlayerData>( data: k ) => PlayerData[k] | false
}

interface ClientEvents {
    updatePileHealth: (uuid: string) => void
    updateCurrency: (currency: Currency, amount: number) => void
}


interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
