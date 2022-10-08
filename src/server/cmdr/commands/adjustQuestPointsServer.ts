import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { PlayerDataService } from "server/services/PlayerDataService";
import { QuestsService } from "server/services/QuestsService";
import { Quest } from "shared/constants/Quests";
import { PlayerData } from "shared/types/PlayerData";

export = function ( context: CommandContext, quest: Quest, tier: number, amount: number, player: Player = context.Executor ) {
    const questsService = Dependency( QuestsService )
    questsService.addPoint(player, quest, tier, amount)
}