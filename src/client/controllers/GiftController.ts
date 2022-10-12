import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { openGui } from "client/utils/openGui";

@Controller({})
export class GiftController implements OnInit {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttonGui = <StarterGui["GiftButton"]>this.playerGui.WaitForChild( "GiftButton" )
    private gui = <StarterGui["Map"]>this.playerGui.WaitForChild( "Map" )

    private frame = this.gui.Frame
    private container = this.frame.Container

    private template = this.container.Template

    private exitButton = this.template
    private openButton = this.buttonGui.Button

    onInit() {
        this.openButton.MouseButton1Click.Connect( () => openGui( this.gui ) )
        this.exitButton.MouseButton1Click.Connect( () => this.gui.Enabled = false )

        Events.claimGift
        Events.resetGifts
        Events.updateGiftPlayDuration
        Events.updateGiftResetTime
    }

}