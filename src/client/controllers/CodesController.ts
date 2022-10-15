import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { openGui } from "client/utils/openGui";
import { CODES, CODES_CONFIG } from "shared/constants/Codes";
import { NotificationsController } from "./NotificationsController";

@Controller({})
export class CodesController implements OnStart {
    private notifcationsController = Dependency(NotificationsController)

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttons = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private gui = <StarterGui["Codes"]>this.playerGui.WaitForChild("Codes")
    private frame = this.gui.Frame

    private textBox = this.frame.TextBox
    private redeemButton = this.frame.Redeem
    private exit = this.frame.Exit
    private openButton = this.buttons.Frame.Codes

    onStart () {
        this.redeemButton.MouseButton1Click.Connect( () => this.redeemCode())
        this.openButton.MouseButton1Click.Connect( () => openGui( this.gui ) )
        this.exit.MouseButton1Click.Connect( () => this.gui.Enabled = false )
    }

    private redeemCode () {
        const code = this.textBox.Text.upper()
        const isCodeValid = CODES.includes( code )
        const expirationTime = isCodeValid ? CODES_CONFIG[code].expiration : 999

        if ( !isCodeValid ) {
            this.notifcationsController.createNotification("That code is invalid!")
        } else if (os.time() >= expirationTime) {
            this.notifcationsController.createNotification("That code is expired!")
        } else if ( clientStore.getState().data.codes.get(code) ) {
            this.notifcationsController.createNotification("You already redeemed this code!")
        } else {
            Events.redeemCode.fire( code )
            this.notifcationsController.createNotification("Code redeemed successfully!")
        }

    }

}