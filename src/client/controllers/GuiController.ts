import { Controller, OnStart, OnInit } from "@flamework/core";
import { Clack, Prefer } from "@rbxts/clack";
import { GuiService, Players, UserInputService } from "@rbxts/services";
import { hideGuis } from "client/utils/hideGuis";
import { makeButtonsSelectable } from "client/utils/openGui";

@Controller({})
export class GuiController implements OnStart {
    private player = Players.LocalPlayer
    private playerGui = <StarterGui>this.player.WaitForChild( "PlayerGui" )

    private guttonsGui = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private mapButton = this.guttonsGui.Frame.Map

    private currencyGui = <StarterGui["Currency"]>this.playerGui.WaitForChild( "Currency" )
    private fullCurrencyFrame = this.currencyGui.Full

    private prefer = new Prefer()

    private inSelectMode = false

    onStart () {
        GuiService.AutoSelectGuiEnabled = false
        UserInputService.InputEnded.Connect( ( input, processed ) => {
            if ( processed ) return
            else if ( input.KeyCode === Enum.KeyCode.ButtonB || input.KeyCode === Enum.KeyCode.X) {
                hideGuis()
                GuiService.SelectedObject = undefined
                makeButtonsSelectable( true )
                this.fullCurrencyFrame.Visible = false
            } else if ( input.KeyCode === Enum.KeyCode.ButtonSelect ) {
                GuiService.SelectedObject = this.inSelectMode ? undefined : this.mapButton
                this.inSelectMode = !this.inSelectMode
            }
        } )

        // BUG: Need to hit Select 2 times to select object AFTER clicking X button on Gui
        // GuiService.GetPropertyChangedSignal( "SelectedObject" ).Connect( () => {
        //     const selectedObject = GuiService.SelectedObject
        //     if (!selectedObject) this.inSelectMode = false
        // })
        GuiService.GetPropertyChangedSignal( "SelectedObject" ).Connect( () => {
            const isOnGamepad = UserInputService.GamepadEnabled
            if ( !isOnGamepad ) GuiService.SelectedObject = undefined
        } )

        this.prefer.observePreferredInput( ( input ) => {
            if (input !== Clack.InputType.Gamepad) GuiService.SelectedObject = undefined
        })
    }
}