import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { QuestsService } from "server/services/QuestsService";
import { Quest } from "shared/constants/Quests";

export = function ( context: CommandContext, quest: Quest, tier: number, amount: number, player: Player = context.Executor ) {
    const questsService = Dependency( QuestsService )
    questsService.addPoint(player, quest, tier, amount)
}