import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { openGui } from "client/utils/openGui";
import { Area, AREAS } from "shared/constants/Areas";
import { AreaController } from "./AreaController";

const LOCKED_COLOR = Color3.fromRGB(117, 117, 117)
const UNLOCKED_COLOR = Color3.fromRGB(255, 255, 255)
const CURRENT_COLOR = Color3.fromRGB(243, 255, 0)

@Controller({})
export class MapController implements OnStart {
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

    onStart () {
        this.generateMap()
        this.updateCurrentArea( this.areaController.currentArea )

        this.openButton.MouseButton1Click.Connect( () => openGui( this.gui ) )
        this.exitButton.MouseButton1Click.Connect( () => this.gui.Enabled = false )

        Events.unlockArea.connect( ( area ) => this.unlockArea( area ) )
        this.areaController.areaChanged.Connect((area) => this.updateCurrentArea(area))
    }

    private updateCurrentArea (area: Area) {
        this.container.GetChildren().forEach( ( child ) => {
            if ( !child.IsA( "TextButton" ) || !child.Visible ) return

            const template = <typeof this.template>child
            const isUnlocked = clientStore.getState().data.areas_unlocked[template.Name]

            if (template.Name === area && isUnlocked) template.Background.ImageColor3 = CURRENT_COLOR
            else if (isUnlocked) template.Background.ImageColor3 = UNLOCKED_COLOR
            else template.Background.ImageColor3 = LOCKED_COLOR
        })
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