import { Networking } from "@flamework/networking";
import { BasketUpgradeResponse, BasketUpgrades } from "./constants/Basket";
import { Currency } from "./constants/Currencies";
import { DevProduct, Gamepass } from "./constants/Gamepasses";
import { PetInstanceProps, PetTypes, UUID } from "./constants/Pets";
import { AreaTypes } from "./constants/Piles";
import { Setting } from "./constants/Settings";
import { PlayerData } from "./types/PlayerData";

interface ServerEvents {
    sell: () => void
    deletePets: (uuids: UUID[]) => void
    deletePet: (uuid: UUID) => void
    unlockPet: (uuid: UUID) => void
    lockPet: (uuid: UUID) => void
    equipPet: (uuid: UUID) => void
    equipBestPets: () => void
    unequipPet: ( uuid: UUID ) => void
    toggleSetting: ( setting: Setting) => void
}

interface ServerFunctions {
    getAllData: () => PlayerData | false
    getData: <k extends keyof PlayerData>( data: k ) => PlayerData[k] | false
    getBasketUpgrade: <k extends keyof PlayerData["basket_upgrades"]>( data: k ) => number | false
    purchaseBasketUpgrade: ( upgrade: BasketUpgrades ) => BasketUpgradeResponse
}

interface ClientEvents {
    updatePileHealth: (uuid: string) => void
    updateCurrency: ( currency: Currency, amount: number ) => void
    updateGamepass: ( gamepass: Gamepass ) => void
    givePet: ( uuid: UUID, props: PetInstanceProps ) => void

    displayBasketUpgradeShop: (area: AreaTypes) => void
    luckyReward: ( amount: number ) => void

    unlockPet: (uuid: UUID) => void
    lockPet: (uuid: UUID) => void
    deletePet: (uuid: UUID) => void
    equipPet: (player: Player, uuid: UUID, pet: PetTypes) => void
    unequipPet: ( player: Player, uuid: UUID ) => void
    toggleSetting: ( setting: Setting, value: boolean ) => void
    purchaseSuccess: ( product: Gamepass | DevProduct ) => void
}


interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
