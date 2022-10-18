import { Controller } from "@flamework/core";
import { BoatTween } from "@rbxts/boat-tween";
import { Players } from "@rbxts/services";
import { DevProduct, Gamepass } from "shared/constants/Monetization";
import { Notification, NOTIFICATION_COLORS, NOTIFICATION_CONFIG } from "shared/constants/Notifications";
import { Quest } from "shared/constants/Quests";

export interface NotificationProps {
    amount?: number
    rarity?: string
    type?: string
    gamepassOrProduct?: Gamepass | DevProduct
    quest?: Quest
    tier?: number
}

@Controller({})
export class NotificationsController {
    private player = Players.LocalPlayer;
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private gui = <StarterGui["Notifications"]>this.playerGui.WaitForChild( "Notifications" )
    private container = this.gui.Container

    private template = this.container.Template

    private generateText ( notification: Notification, props?: NotificationProps ): string {
        let text: string = notification
        if ( props ) {
            if (props.amount) text = text.gsub("AMOUNT", props.amount)[0]
            if (props.rarity) text = text.gsub("RARITY", props.rarity)[0]
            if ( props.type ) text = text.gsub( "TYPE", props.type )[0]

            if ( props.gamepassOrProduct ) text = text.gsub( "GAMEPASS", props.gamepassOrProduct )[0]

            if (props.quest) text = text.gsub("QUEST", `${props.quest} ${props.tier}`)[0]
        }

        return text
    }

    public createNotification ( notification: Notification, props?: NotificationProps ) {
        const notificationConfig = NOTIFICATION_CONFIG[notification]
        const template = this.template.Clone()
        template.Parent = this.container
        template.Visible = true

        template.Message.Text = this.generateText(notification, props)
        template.BackgroundColor3 = NOTIFICATION_COLORS[notificationConfig.type]

        task.delay( 3, () => {

            const tween = BoatTween.Create( template, {
                Time: .5,
                Goal: {
                    Transparency: 1
                }
            } )

            const tween2 = BoatTween.Create( template.Message, {
                Time: .5,
                Goal: {
                    TextTransparency: 1
                }
            } )

            tween.Play()
            tween2.Play()

            task.wait(.5)
            template.Destroy()
        })
    }

}