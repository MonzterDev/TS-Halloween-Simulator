import { Dependency } from "@flamework/core";
import { BoostsService } from "server/services/BoostsService";
import { PlayerDataService } from "server/services/PlayerDataService";
import { Boosts } from "shared/constants/Boosts";
import { BoosterQuestRewardProps, Reward, Reward2 } from "shared/constants/Quests";

const playerDataService = Dependency(PlayerDataService)

export function rewardMoney ( player: Player, amount: number, useMultiplier: boolean ) {
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return

    profile.adjustMoney(amount)
}

export function reward ( player: Player, rewards: Partial<Reward> | Partial<Reward2> ) {
    const boostsService = Dependency(BoostsService)

    const profile = playerDataService.getProfile( player )
    if ( !profile ) return

    for ( const [rewardType, props] of pairs( rewards ) ) {
        const isABoost = Boosts.includes( <Boosts>rewardType )
        if ( isABoost ) {
            const boosterInfo = <BoosterQuestRewardProps> props
            boostsService.rewardBoost(player, <Boosts>rewardType, boosterInfo.rarity, boosterInfo.amount)
        } else {
            const currencyAmount =  <number> props
            if ( rewardType === "candy" ) profile.adjustCandy(currencyAmount )
            else if ( rewardType === "money" ) profile.adjustMoney(currencyAmount )
        }
    }
}