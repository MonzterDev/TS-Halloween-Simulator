import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { PlayerDataService } from "server/services/PlayerDataService";
import { PlayerData } from "shared/types/PlayerData";

export = function ( context: CommandContext, player: Player = context.Executor, directory: keyof PlayerData ) {
    const playerDataService = Dependency( PlayerDataService )
    const profile = playerDataService.getProfile( player )
    if ( !profile ) return "No profile?"

    print( profile.data[directory] )
}