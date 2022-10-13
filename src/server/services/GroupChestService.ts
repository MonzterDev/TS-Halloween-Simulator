import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { rewardMoney } from "server/utils/Rewards";
import { GROUP_ID } from "shared/constants/Group";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class GroupChestService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)

    onStart () {
        this.setup()
    }

    private setup () {
        Workspace.GroupChest.Touched.Connect( ( otherPart ) => {
            const player = Players.GetPlayerFromCharacter(otherPart.Parent)
            if ( player ) this.giveReward(player)
        })
    }

    private reset (player: Player) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        profile.data.group_chest.reset_time = os.time() + 86400
        profile.data.group_chest.claimed = false
        Events.resetGroupChest.fire(player, profile.data.group_chest.reset_time)
    }

    private giveReward ( player: Player ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const isInGroup = player.IsInGroup( GROUP_ID )
        if (!isInGroup) return

        const resetTime = profile.data.group_chest.reset_time
        if (os.time() >= resetTime) this.reset(player)

        const isClaimed = profile.data.group_chest.claimed
        if ( isClaimed ) return

        profile.data.group_chest.claimed = true
        rewardMoney( player, 1_000, true )
        Events.claimGroupChest.fire(player)
    }
}