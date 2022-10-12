import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Events } from "server/network";
import { reward } from "server/utils/Rewards";
import { Boosts } from "shared/constants/Boosts";
import { BoosterQuestRewardProps, getActiveQuestTier, Quest, QuestConfig } from "shared/constants/Quests";
import { BoostsService } from "./BoostsService";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class QuestsService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)
    private boostsService = Dependency(BoostsService)

    onInit () {
        Events.claimQuest.connect((player, quest, tier) => this.claimQuest(player, quest, tier))
    }

    public addPoint (player: Player, quest: Quest, tier?: number, amount: number = 1 ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        if (!tier) tier = getActiveQuestTier(profile.data.quests[quest])
        if (!profile.data.quests[quest][tier]) return // Completed all tiers of that quest

        const questConfig = QuestConfig[quest]
        const requiredPoints = questConfig.points_per_tier * tier

        profile.adjustQuestPoints( quest, tier, amount )
        if (profile.data.quests[quest][tier].points >= requiredPoints ) this.completeQuest(player, quest, tier)
    }

    public completeQuest ( player: Player, quest: Quest, tier: number ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const isCompleted = profile.data.quests[quest][tier].completed
        if (isCompleted) return

        const questConfig = QuestConfig[quest]
        const requiredPoints = questConfig.points_per_tier * tier

        profile.data.quests[quest][tier].points = 0
        profile.adjustQuestPoints(quest, tier, requiredPoints)
        profile.data.quests[quest][tier].completed = true
        Events.completeQuest.fire( player, quest, tier )
    }

    private claimQuest ( player: Player, quest: Quest, tier: number ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const questConfig = QuestConfig[quest]
        const rewards = questConfig.reward[tier]

        const isCompleted = profile.data.quests[quest][tier].completed
        const isClaimed = profile.data.quests[quest][tier].claimed_reward
        if ( isClaimed || !isCompleted ) return

        reward( player, rewards )

        profile.data.quests[quest][tier].claimed_reward = true
        Events.claimQuest.fire(player, quest, tier)
    }



}