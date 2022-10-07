import { Dependency } from "@flamework/core";
import { PlayerDataService } from "server/services/PlayerDataService";
import { Boosts } from "shared/constants/Boosts";
import { Rarities } from "shared/constants/Pets";

const playerDataService = Dependency(PlayerDataService)

export function rewardMoney ( player: Player, amount: number, useMultiplier: boolean ) {
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return

    profile.adjustMoney(amount)
}
