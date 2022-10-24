import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { openGui } from "client/utils/openGui";
import { timeToString } from "shared/util/functions/timeToString";
import { NotificationsController } from "./NotificationsController";

@Controller({})
export class GiftController implements OnStart {
    private notificationsController = Dependency(NotificationsController)

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttonGui = <StarterGui["GiftButton"]>this.playerGui.WaitForChild( "GiftButton" )
    private gui = <StarterGui["Gifts"]>this.playerGui.WaitForChild( "Gifts" )

    private frame = this.gui.Frame
    private container = this.frame.Container
    private resetTime = this.frame.Reset

    private template = this.container.Template

    private exitButton = this.frame.Exit
    private openButton = this.buttonGui.Button

    onStart() {
        this.openButton.MouseButton1Click.Connect( () => openGui( this.gui ) )
        this.exitButton.MouseButton1Click.Connect( () => this.gui.Enabled = false )

        Events.claimGift.connect((gift) => this.claimGift(gift))
        Events.resetGifts.connect(() => this.resetGifts())
        Events.updateGiftPlayDuration.connect( ( time ) => {
            this.updateGiftTimes( time )
            this.updateButtonProgress()
            this.updateResetTime()
        } )
        this.generateGifts()
    }

    private resetGifts () {
        this.container.GetChildren().forEach( ( child ) => {
            if ( !child.IsA( "TextButton" ) || !child.Visible ) return
            child.Destroy()
        } )
        this.generateGifts()
    }

    private claimGift ( gift: number ) {
        const templtate = <typeof this.template>this.container.FindFirstChild( gift )
        if ( !templtate ) return

        templtate.Time.Visible = false
        templtate.ProgressBar.Visible = false
        templtate.Claimed.Visible = true
        templtate.SetAttribute("Claimed", true)
    }

    private updateGiftTimes (secondsPlayed: number) {
        this.container.GetChildren().forEach( ( child ) => {
            if ( !child.IsA( "GuiButton" ) || !child.Visible || child.GetAttribute( "Claimed" ) ) return
            const timeInSeconds = tonumber( child.Name )! * 60
            const secondsUntilUnlocked = timeInSeconds - secondsPlayed
            const isUnlocked = secondsUntilUnlocked <= 0

            const template = <typeof this.template>child
            if ( !template || !template.Time.Visible ) return

            const percentCompleted = secondsPlayed / timeInSeconds <= 1 ? secondsPlayed / timeInSeconds : 1

            template.ProgressBar.Bar.Size = UDim2.fromScale( percentCompleted, 1 )
            template.Time.Text = timeToString( secondsUntilUnlocked )
            template.Time.Visible = !isUnlocked

            if (isUnlocked && !template.GetAttribute( "notified" ) ) {
                template.SetAttribute( "notified", true )
                this.notificationsController.createNotification("You have a new Gift to claim!")
            }
        })
    }

    private generateGifts () {
        const secondsPlayed = clientStore.getState().data.gift_time_played

        for ( const [time, claimed] of pairs( clientStore.getState().data.gifts ) ) {
            const timeInSeconds = time * 60
            const secondsUntilUnlocked = timeInSeconds - secondsPlayed

            const clone = this.template.Clone()
            clone.Name = tostring(time)
            clone.Parent = this.container
            clone.Visible = true
            clone.Claimed.Visible = claimed
            clone.ProgressBar.Bar.Size = UDim2.fromScale( secondsPlayed / timeInSeconds, 1 )
            clone.ProgressBar.Visible = !claimed
            clone.Time.Text = timeToString( secondsUntilUnlocked )
            clone.Time.Visible = !claimed
            clone.SetAttribute("Claimed", claimed)

            clone.MouseButton1Click.Connect(() => Events.claimGift.fire(time))
        }
    }

    private updateResetTime () {
        const resetTime = clientStore.getState().data.gift_reset_time
        const currentTime = os.time()
        this.resetTime.Text = timeToString(resetTime - currentTime)
    }

    private updateButtonProgress () {
        const secondsPlayed = clientStore.getState().data.gift_time_played

        let soonestGift
        for ( const [time, claimed] of pairs( clientStore.getState().data.gifts ) ) {
            const timeInSeconds = time * 60
            const secondsUntilUnlocked = timeInSeconds - secondsPlayed

            if ( !claimed && secondsUntilUnlocked > 0 ) {
                soonestGift = time
                break
            }
        }

        if ( !soonestGift ) {
            this.openButton.ProgressBar.Visible = false
            return
        }

        const timeInSeconds = soonestGift * 60

        this.openButton.ProgressBar.CompletedProgressBar.Size = UDim2.fromScale( secondsPlayed / timeInSeconds, 1 )
        this.openButton.ProgressBar.Visible = true
    }

}