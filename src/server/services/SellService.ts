import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { rewardMoney } from "server/utils/Rewards";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class SellService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)
    private sellFolder = Workspace.Sell

    onInit () {
        this.setupParts()
        Events.sell.connect( ( player ) => {
            const profile = this.playerDataService.getProfile( player )
            if ( !profile ) return
            // if has gamepass then this.sell()
        })
    }

    private setupParts () {
        this.sellFolder.GetChildren().forEach( ( part ) => {
            if ( !part.IsA( "BasePart" ) ) return
            part.Touched.Connect( ( otherPart ) => {
                if (!otherPart.IsA("BasePart")) return
                const player = Players.GetPlayerFromCharacter( otherPart.Parent )
                if ( !player ) return
                this.sell(player)
            })
        })
    }

    private sell ( player: Player ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        const candy = profile.data.candy
        rewardMoney( player, candy, true )
        profile.setCandy(0)
    }

}