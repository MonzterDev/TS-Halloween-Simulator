import { Dependency } from "@flamework/core";
import { PlayerDataService } from "server/services/PlayerDataService";

const playerDataService = Dependency(PlayerDataService)

export function rewardMoney ( player: Player, amount: number, useMultiplier: boolean ) {
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return

    profile.adjustMoney(amount)
}