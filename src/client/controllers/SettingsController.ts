import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { getSettingAsProp, OFF_BUTTON, ON_BUTTON, Setting } from "shared/constants/Settings";
import { Settings } from "shared/types/PlayerData";
import { PetsController } from "./PetsController";


@Controller({})
export class SettingsController implements OnInit {
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

    onInit () {
        this.openButton.MouseButton1Click.Connect(() => this.gui.Enabled = !this.gui.Enabled)
        this.exit.MouseButton1Click.Connect(() => this.gui.Enabled = false)
        Events.toggleSetting.connect( ( setting, value ) => this.updateSetting( setting, value ) )
        Setting.forEach((setting) => this.generateTemplate(setting))
    }

    private updateSetting ( setting: Setting, value: boolean ) {
        const clone = <typeof this.template> this.container.FindFirstChild( setting )
        if ( !clone ) return
        clone.Toggle.Image = value ? ON_BUTTON : OFF_BUTTON
        this.performUpdate(setting)
    }

    private generateTemplate ( setting: Setting ) {
        const clone = this.template.Clone()
        clone.Parent = this.container
        clone.Visible = true
        clone.Name = setting
        clone.Setting.Text = setting

        clone.Toggle.Image = clientStore.getState().data.settings[getSettingAsProp(setting)] ? ON_BUTTON : OFF_BUTTON
        clone.MouseButton1Click.Connect( () =>Events.toggleSetting.fire( setting ))
    }

    private performUpdate ( setting: Setting ) {
        const value = clientStore.getState().data.settings[getSettingAsProp(setting)]
        switch (setting) {
            case "Hide Others Pets":
                if ( !value ) this.petsController.clearActivePets()
                break;
            case "Music":

                break;
        }
    }
}