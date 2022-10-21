import { Networking } from "@flamework/networking";
import { Area } from "./constants/Areas";
import { BasketUpgrade, BasketUpgradeResponse, BASKET_UPGRADES } from "./constants/Basket";
import { Boost, BOOSTS } from "./constants/Boosts";
import { Code } from "./constants/Codes";
import { Currency } from "./constants/Currencies";
import { DevProduct, Gamepass } from "./constants/Monetization";
import { GiftTime } from "./constants/Gifts";
import { Egg, EGGS, Pet, PetInstanceProps, PETS, RARITIES, Rarity, UUID } from "./constants/Pets";
import { Quest } from "./constants/Quests";
import { Setting, SETTINGS } from "./constants/Settings";
import { PlayerData, TutorialData } from "./types/PlayerData";

export type HatchEggResponse =  Pet[] | undefined

interface ServerEvents {
    sell: () => void
    deletePets: (uuids: UUID[]) => void
    deletePet: (uuid: UUID) => void
    unlockPet: (uuid: UUID) => void
    lockPet: (uuid: UUID) => void
    equipPet: (uuid: UUID) => void
    equipBestPets: () => void
    unequipPet: ( uuid: UUID ) => void
    autoDeletePet: ( egg: Egg, pet: Pet ) => void
    toggleSetting: ( setting: Setting) => void
    useBoost: ( boost: Boost, rarity: Rarity ) => void
    unlockArea: ( area: Area ) => void
    claimQuest: ( quest: Quest, tier: number ) => void
    claimGift: ( gift: GiftTime ) => void
    redeemCode: ( code: Code ) => void
    addToPetIndex: ( egg: Egg, pet: Pet ) => void
}

interface ServerFunctions {
    getData: <k extends keyof PlayerData>( data: k ) => PlayerData[k] | false
    getBasketUpgrade: <k extends keyof PlayerData["basket_upgrades"]>( data: k ) => number | false
    purchaseBasketUpgrade: ( upgrade: BasketUpgrade ) => BasketUpgradeResponse
    hatchEgg: (egg: Egg) => HatchEggResponse
}

interface ClientEvents {
    updateData: (data: string) => void // String is used because Flamework's Type Guards don't recognize PlayerData for some reason
    updatePileHealth: (uuid: string) => void
    updateCurrency: ( currency: Currency, amount: number ) => void
    updateGamepass: ( gamepass: Gamepass ) => void
    givePet: ( uuid: UUID, props: PetInstanceProps ) => void

    displayBasketUpgradeShop: (area: Area) => void
    luckyReward: ( amount: number ) => void

    unlockPet: (uuid: UUID) => void
    lockPet: (uuid: UUID) => void
    deletePet: (uuid: UUID) => void
    equipPet: (player: Player, uuid: UUID, pet: Pet) => void
    unequipPet: ( player: Player, uuid: UUID ) => void
    autoDeletePet: ( egg: Egg, pet: Pet ) => void
    addToPetIndex: ( egg: Egg, pet: Pet ) => void

    toggleSetting: ( setting: Setting, value: boolean ) => void
    purchaseSuccess: ( product: Gamepass | DevProduct ) => void

    gainBoost: ( boost: Boost, rarity: Rarity) => void
    useBoost: ( boost: Boost, rarity: Rarity) => void
    endBoost: ( boost: Boost) => void
    unlockArea: ( area: Area ) => void

    updateQuestPoints: ( quest: Quest, tier: number, points: number) => void
    completeQuest: ( quest: Quest, tier: number) => void
    claimQuest: ( quest: Quest, tier: number ) => void

    updateGiftResetTime: ( amount: number ) => void
    updateGiftPlayDuration: ( amount: number ) => void
    resetGifts: ( ) => void
    claimGift: ( gift: GiftTime ) => void

    redeemCode: ( code: Code ) => void

    claimGroupChest: ( ) => void
    resetGroupChest: ( time: number ) => void

    resetEggPity: (egg: Egg ) => void
    increaseEggPity: ( egg: Egg ) => void
}


interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
