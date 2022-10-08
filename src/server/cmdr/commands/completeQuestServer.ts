import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { PlayerDataService } from "server/services/PlayerDataService";
import { QuestsService } from "server/services/QuestsService";
import { Quest } from "shared/constants/Quests";
import { PlayerData } from "shared/types/PlayerData";

export = function ( context: CommandContext, quest: Quest, tier: number, completePrevious: boolean = true, player: Player = context.Executor ) {
    const questsService = Dependency( QuestsService )

    if ( !completePrevious ) {
        questsService.completeQuest( player, quest, tier )
        return
    }

    let i = 1
    while ( i <= tier ) {
        questsService.completeQuest( player, quest, i )
        i += 1
        task.wait()
    }

}