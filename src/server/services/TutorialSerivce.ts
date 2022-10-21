import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { GameAnalytics } from "@rbxts/gameanalytics";
import { TutorialData } from "shared/types/PlayerData";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class TutorialSerivce {
    private playerDataService = Dependency( PlayerDataService )

    public completeTutorial ( player: Player, tutorial: keyof TutorialData ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const isCompleted = profile.data.tutorial[tutorial]
        if (isCompleted) return

        profile.data.tutorial[tutorial] = true
        GameAnalytics.addDesignEvent( player.UserId, {
            eventId: `Tutorial:${tutorial}`
        })
    }
}