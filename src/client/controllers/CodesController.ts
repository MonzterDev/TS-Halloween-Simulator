import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { openGui } from "client/utils/openGui";
import { CODES, CODES_CONFIG } from "shared/constants/Codes";

@Controller({})
export class CodesController implements OnStart {
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
            this.redeemButton.Text = "Invalid Code"
            this.redeemButton.BackgroundColor3 = Color3.fromRGB( 255, 0, 0 )
            task.delay( 2, () => {
                this.redeemButton.Text = "REDEEM"
                this.redeemButton.BackgroundColor3 = Color3.fromRGB( 43, 255, 0 )
            } )
        } else if (os.time() >= expirationTime) {
            this.redeemButton.Text = "Expired Code"
            this.redeemButton.BackgroundColor3 = Color3.fromRGB( 255, 0, 0 )
            task.delay( 2, () => {
                this.redeemButton.Text = "REDEEM"
                this.redeemButton.BackgroundColor3 = Color3.fromRGB( 43, 255, 0 )
            } )
        } else if ( clientStore.getState().data.codes.get(code) ) {
            this.redeemButton.Text = "Already Redeemed"
            this.redeemButton.BackgroundColor3 = Color3.fromRGB( 255, 0, 0 )
            task.delay( 2, () => {
                this.redeemButton.Text = "REDEEM"
                this.redeemButton.BackgroundColor3 = Color3.fromRGB( 43, 255, 0 )
            } )
        } else {
            Events.redeemCode.fire( code )
            this.redeemButton.Text = "Success"
            this.redeemButton.BackgroundColor3 = Color3.fromRGB( 43, 255, 0 )
            task.delay( 2, () => {
                this.redeemButton.Text = "REDEEM"
                this.redeemButton.BackgroundColor3 = Color3.fromRGB( 43, 255, 0 )
            } )
        }

    }

}