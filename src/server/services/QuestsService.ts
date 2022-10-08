import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Events } from "server/network";
import { Quest, QuestConfig } from "shared/constants/Quests";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class QuestsService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)

    onInit() {

    }

    public addPoint (player: Player, quest: Quest, tier: number, amount: number = 1 ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const questConfig = QuestConfig[quest]
        const requiredPoints = questConfig.points_per_tier * tier

        profile.adjustQuestPoints( quest, tier, amount )
        if (profile.data.quests[quest][tier].points === requiredPoints ) this.completeQuest(player, quest, tier)
    }

    public completeQuest ( player: Player, quest: Quest, tier: number ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const questConfig = QuestConfig[quest]
        const requiredPoints = questConfig.points_per_tier * tier

        profile.data.quests[quest][tier].points = 0
        profile.adjustQuestPoints(quest, tier, requiredPoints)
        profile.data.quests[quest][tier].completed = true
        Events.completeQuest.fire( player, quest, tier )
    }
}