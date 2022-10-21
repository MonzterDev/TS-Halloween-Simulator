import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Events } from "server/network";
import { Area, AREA_WALL_CONFIG } from "shared/constants/Areas";
import { PlayerDataService } from "./PlayerDataService";
import { TutorialSerivce } from "./TutorialSerivce";

@Service({})
export class AreaWallService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)
    private tutorialSerivce = Dependency( TutorialSerivce )

    onStart () {
        Events.unlockArea.connect((player, area) => this.requestUnlockWall(player, area))
    }

    private requestUnlockWall (player: Player, area: Area ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const isUnlocked = profile.data.areas_unlocked[area]
        if ( isUnlocked ) return

        const requiredArea = AREA_WALL_CONFIG[area].requirements
        if ( requiredArea && !profile.data.areas_unlocked[requiredArea]) return

        const money = profile.data.money
        const price = AREA_WALL_CONFIG[area].coin_price
        if ( money < price ) return

        profile.adjustMoney( price )
        profile.data.areas_unlocked[area] = true
        Events.unlockArea.fire( player, area )
        this.tutorialSerivce.completeTutorial(player, "unlock_area")
    }

}