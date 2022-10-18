import { Dependency } from "@flamework/core";
import { GameAnalytics } from "@rbxts/gameanalytics";
import { BoostsService } from "server/services/BoostsService";
import { PlayerDataService } from "server/services/PlayerDataService";
import { Boost, BOOSTS } from "shared/constants/Boosts";
import { BoosterQuestRewardProps, Reward, Reward2 } from "shared/constants/Quests";
import { getCandyMultipler, getMoneyMultipler } from "./Stats";


export function rewardMoney ( player: Player, amount: number, useMultiplier: boolean ) {
    const playerDataService = Dependency(PlayerDataService)
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return

    const multiplier = getMoneyMultipler(player)

    if (useMultiplier) amount *= multiplier

    profile.adjustMoney( amount )
}

export function rewardCandy ( player: Player, amount: number, useMultiplier: boolean ) {
    const playerDataService = Dependency(PlayerDataService)
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return

    const multiplier = getCandyMultipler(player)

    if (useMultiplier) amount *= multiplier

    profile.adjustCandy(amount)
}

export function reward ( player: Player, rewards: Partial<Reward> | Partial<Reward2> ) {
    const boostsService = Dependency(BoostsService)
    const playerDataService = Dependency(PlayerDataService)

    const profile = playerDataService.getProfile( player )
    if ( !profile ) return

    for ( const [rewardType, props] of pairs( rewards ) ) {
        const isABoost = BOOSTS.includes( <Boost>rewardType )
        if ( isABoost ) {
            const boosterInfo = <BoosterQuestRewardProps> props
            boostsService.rewardBoost(player, <Boost>rewardType, boosterInfo.rarity, boosterInfo.amount)
        } else {
            const currencyAmount =  <number> props
            if ( rewardType === "candy" ) profile.adjustCandy(currencyAmount )
            else if ( rewardType === "money" ) profile.adjustMoney(currencyAmount )
        }
    }
}