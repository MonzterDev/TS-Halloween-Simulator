import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { clientStore } from "client/rodux/rodux";
import { GROUP_ID } from "shared/constants/Group";
import { timeToString } from "shared/util/functions/timeToString";
import { NotificationsController } from "./NotificationsController";

@Controller({})
export class GroupChestController implements OnStart {
    private notificationsController = Dependency(NotificationsController)

    private player = Players.LocalPlayer

    private groupChest = Workspace.GroupChest

    private billboardGui = this.groupChest.Attachment.Display

    onStart () {
        this.notify()
        this.loop()
    }

    private loop () {
        while ( true ) {
            const resetTime = clientStore.getState().data.group_chest.reset_time
            const isClaimed = clientStore.getState().data.group_chest.claimed

            this.billboardGui.Time.Text = timeToString( resetTime - os.time() )
            this.billboardGui.Time.Visible = isClaimed
            task.wait(1)
        }
    }

    private notify () {
        this.groupChest.Touched.Connect( ( otherPart ) => {
            const player = Players.GetPlayerFromCharacter(otherPart.Parent)
            if ( !player || player !== this.player ) return

            if (!player.IsInGroup(GROUP_ID)) this.notificationsController.createNotification("Join our Group to receive rewards!")
        })
    }
}