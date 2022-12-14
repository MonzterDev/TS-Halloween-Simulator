import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { closeGui, openGui } from "client/utils/openGui";
import { OFF_BUTTON, ON_BUTTON, Setting, SETTINGS } from "shared/constants/Settings";
import { PetsController } from "./PetsController";


@Controller({})
export class SettingsController implements OnStart {
    private petsController = Dependency(PetsController)
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttonsGui = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private openButton = this.buttonsGui.Frame.Settings

    private gui = <StarterGui["Settings"]>this.playerGui.WaitForChild( "Settings" )
    private frame = this.gui.Frame
    private container = this.frame.Container

    private exit = this.frame.Exit

    private template = this.container.Template

    private connection = clientStore.changed.connect( ( newState ) => {
        newState.data.settings.forEach( ( value, setting ) => this.updateSetting( setting, value ) )
        this.connection.disconnect()
    })

    onStart () {
        SETTINGS.forEach( ( setting ) => this.generateTemplate( setting ) )

        this.openButton.MouseButton1Click.Connect( () => openGui(this.gui) )
        this.exit.MouseButton1Click.Connect(() => closeGui(this.gui))
        Events.toggleSetting.connect( ( setting, value ) => this.updateSetting( setting, value ) )
    }

    private updateSetting ( setting: Setting, value: boolean ) {
        const clone = <typeof this.template> this.container.FindFirstChild( setting )
        if ( !clone ) return
        clone.Toggle.On.Visible = value
        clone.Toggle.Off.Visible = !value
        this.performUpdate(setting)
    }

    private generateTemplate ( setting: Setting ) {
        const clone = this.template.Clone()
        clone.Parent = this.container
        clone.Visible = true
        clone.Name = setting
        clone.Setting.Text = setting

        const isEnabled = clientStore.getState().data.settings.get( setting )!
        clone.Toggle.On.Visible = isEnabled
        clone.Toggle.Off.Visible = !isEnabled
        clone.MouseButton1Click.Connect( () => Events.toggleSetting.fire( setting ))
    }

    private performUpdate ( setting: Setting ) {
        const value = clientStore.getState().data.settings.get( setting )
        switch (setting) {
            case "Hide Others Pets":
                if ( !value ) this.petsController.clearActivePets()
                break;
            case "Music":

                break;
        }
    }
}