import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { DevProduct, Gamepass, getGamepassIDFromGamepass } from "shared/constants/Gamepasses";

@Controller({})
export class MonetizationController implements OnInit {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private gui = <StarterGui["Monetization"]>this.playerGui.WaitForChild( "Monetization" )
    private frame = this.gui.Frame
    private message = this.frame.Message

    onInit () {
        Events.purchaseSuccess.connect((product) =>  this.notifyPlayer(product))
    }

    private notifyPlayer ( product: Gamepass | DevProduct ) {
        const isGamepass = getGamepassIDFromGamepass( <Gamepass>product )

        this.message.Text = `You purchased ${product}, enjoy!`
        this.gui.Enabled = true
        task.delay(7, () => this.gui.Enabled = false)
    }

}