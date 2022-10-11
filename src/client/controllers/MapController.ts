import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { openGui } from "client/utils/openGui";
import { Area, AREAS } from "shared/constants/Areas";
import { OFF_BUTTON } from "shared/constants/Settings";
import { AreaController } from "./AreaController";

const LOCKED_COLOR = Color3.fromRGB(117, 117, 117)
const UNLOCKED_COLOR = Color3.fromRGB(255, 255, 255)

@Controller({})
export class MapController implements OnInit {
    private areaController = Dependency(AreaController)

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttons = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private gui = <StarterGui["Map"]>this.playerGui.WaitForChild( "Map" )

    private openButton = this.buttons.Frame.Map

    private frame = this.gui.Frame
    private container = this.frame.Container
    private template = this.container.Template

    private exitButton = this.frame.Exit

    private connection = clientStore.changed.connect( ( newState ) => {
        for ( const [area, unlocked] of pairs( newState.data.areas_unlocked ) ) {
            if (unlocked) this.unlockArea(area)
        }
        this.connection.disconnect()
    })

    onInit () {
        this.generateMap()
        this.openButton.MouseButton1Click.Connect( () => openGui( this.gui ) )
        this.exitButton.MouseButton1Click.Connect( () => this.gui.Enabled = false )

        Events.unlockArea.connect((area) => this.unlockArea(area))
    }

    private unlockArea ( area: Area ) {
        const template = <typeof this.template> this.container.FindFirstChild( area )
        if ( !template ) return

        template.Area.Text = area.gsub("_", " ")[0]
        template.Background.ImageColor3 = UNLOCKED_COLOR
    }

    private generateMap () {
        AREAS.forEach( ( area ) => {
            const clone = this.template.Clone()
            clone.Parent = this.container
            clone.Name = area
            clone.Visible = true
            clone.Area.Text = "?"
            clone.Background.ImageColor3 = LOCKED_COLOR

            clone.MouseButton1Click.Connect( () => this.teleportToArea( area ) )

            const isUnlocked = clientStore.getState().data.areas_unlocked[area]
            if (isUnlocked) this.unlockArea(area)
        })
    }

    private teleportToArea ( area: Area ) {
        const isUnlocked = clientStore.getState().data.areas_unlocked[area]
        if ( !isUnlocked ) return

        const teleportPart = this.areaController.getPart( "Spawn", area )
        if ( !teleportPart ) return

        const character = this.player.Character
        if ( !character ) return

        character.PivotTo(teleportPart.CFrame)
    }

}