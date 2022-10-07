import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Events } from "server/network";
import { Area, AreaWallConfig } from "shared/constants/Areas";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class AreaWallService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)

    onInit () {
        Events.unlockArea.connect((player, area) => this.requestUnlockWall(player, area))
    }

    private requestUnlockWall (player: Player, area: Area ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const isUnlocked = profile.data.areas_unlocked[area]
        if ( isUnlocked ) return

        const requiredArea = AreaWallConfig[area].requirements
        if ( requiredArea && !profile.data.areas_unlocked[requiredArea]) return

        const money = profile.data.money
        const price = AreaWallConfig[area].coin_price
        if ( money < price ) return

        profile.adjustMoney( price )
        profile.data.areas_unlocked[area] = true
        Events.unlockArea.fire(player, area)
    }

}