import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { FormatCompact } from "@rbxts/format-number";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { hideGuis } from "client/utils/hideGuis";
import { Area, AREA_WALL_CONFIG } from "shared/constants/Areas";
import { cleanString } from "shared/util/functions/cleanString";
import { NotificationsController } from "./NotificationsController";

@Controller({})
export class BoostController implements OnStart {
    private notificationsController = Dependency(NotificationsController)

    private areasFolder = Workspace.Areas

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private folder = <StarterGui["AreaWalls"]>this.playerGui.WaitForChild( "AreaWalls" )
    private purchaseGui = <StarterGui["AreaPurchase"]>this.playerGui.WaitForChild( "AreaPurchase" )

    private guiTemplate = this.folder.AreaDisplay

    private buyButton = this.purchaseGui.Frame.Buy
    private exitButton = this.purchaseGui.Frame.Exit

    private selectedArea: Area | undefined

    // In case the Data wasn't loaded onInit
    private connection = clientStore.changed.connect( ( newState ) => {
        this.prugeWalls()
        this.generateWalls()
        this.connection.disconnect()
    })

    onStart () {
        this.prugeWalls()
        this.generateWalls()

        Events.unlockArea.connect( ( area ) => {
            this.unlockWall( area )
            this.purchaseGui.Enabled = false
        } )
        this.exitButton.MouseButton1Click.Connect( () => this.purchaseGui.Enabled = false )
        this.buyButton.MouseButton1Click.Connect(() => this.requestUnlockWall())
    }

    private prugeWalls () {
        const areaData = clientStore.getState().data.areas_unlocked
        for ( const [area, unlocked] of pairs( areaData ) ) {
            if ( !unlocked ) continue

            const areaFolder = this.areasFolder.FindFirstChild( area )
            if ( !areaFolder ) continue

            const wallInstance = <Part>areaFolder.FindFirstChild( "Wall" )
            if ( !wallInstance ) continue

            wallInstance.Destroy()
        }
    }

    private generateWalls () {
        this.areasFolder.GetChildren().forEach( ( areaFolder ) => {
            const area = areaFolder.Name
            const wallInstance = <Part>areaFolder.FindFirstChild( "Wall" )
            if ( !wallInstance ) return

            const attachment = wallInstance.FindFirstChildOfClass("Attachment")

            const guiClone = this.guiTemplate.Clone()
            guiClone.Enabled = true
            guiClone.Parent = attachment
            guiClone.Area.Text = area.gsub( "_", " " )[0]
            guiClone.Price.Text = FormatCompact( AREA_WALL_CONFIG[area].coin_price )

            wallInstance.Touched.Connect( ( otherPart ) => {
                const player = Players.GetPlayerFromCharacter(otherPart.Parent)
                if ( !player || player !== this.player ) return
                this.selectedArea = area

                this.purchaseGui.Frame.Area.Text = cleanString(area)
                this.purchaseGui.Frame.Price.Text = FormatCompact( AREA_WALL_CONFIG[area].coin_price )
                this.purchaseGui.Enabled = true
                hideGuis(this.purchaseGui)
            })
        } )
    }

    private requestUnlockWall () {
        if ( !this.selectedArea ) return

        const money = clientStore.getState().data.money
        const price = AREA_WALL_CONFIG[this.selectedArea].coin_price
        if ( money < price ) {
            this.notificationsController.createNotification("You don't have enough money!")
            return
        }

        Events.unlockArea.fire(this.selectedArea)
    }

    private unlockWall ( area: Area ) {
        const areaFolder = this.areasFolder.FindFirstChild( area )!
        const wallInstance = areaFolder.FindFirstChild( "Wall" )
        if ( !wallInstance ) return
        wallInstance.Destroy()
    }

}