import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { rewardMoney } from "server/utils/Rewards";
import { PlayerDataService } from "./PlayerDataService";
import { QuestsService } from "./QuestsService";

@Service({})
export class SellService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)
    private questsService = Dependency(QuestsService)

    onStart () {
        this.setupParts()
        Events.sell.connect( ( player ) => {
            const profile = this.playerDataService.getProfile( player )
            if ( !profile ) return

            const ownsGamepass = profile.data.gamepasses.get( "Sell from Anywhere" )
            if (ownsGamepass ) this.sell(player)
        })
    }

    private setupParts () {
        Workspace.Areas.GetChildren().forEach( ( areaFolder ) => {
            const sellPart = <Part> areaFolder.FindFirstChild( "Sell" )
            if ( !sellPart ) return

            sellPart.Touched.Connect( ( otherPart ) => {
                if (!otherPart.IsA("BasePart")) return
                const player = Players.GetPlayerFromCharacter( otherPart.Parent )
                if ( player ) this.sell(player)
            })
        })
    }

    private sell ( player: Player ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const candy = profile.data.candy
        rewardMoney( player, candy, true )
        profile.setCandy( 0 )
        this.questsService.addPoint(player, "Salesman")
    }

}