import { Controller, OnStart, OnInit } from "@flamework/core";
import { FormatCompact } from "@rbxts/format-number";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { Area, AreaWallConfig } from "shared/constants/Areas";

@Controller({})
export class BoostController implements OnInit {

    private areasFolder = Workspace.Areas

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private folder = <StarterGui["AreaWalls"]>this.playerGui.WaitForChild( "AreaWalls" )

    private guiTemplate = this.folder.AreaDisplay
    private pruchaseGui = this.folder.Purchase

    private buyButton = this.pruchaseGui.Frame.Buy
    private exitButton = this.pruchaseGui.Frame.Exit

    private selectedArea: Area | undefined

    // In case the Data wasn't loaded onInit
    private connection = clientStore.changed.connect( ( newState ) => {
        this.prugeWalls()
        this.generateWalls()
        this.connection.disconnect()
    })

    onInit () {
        this.prugeWalls()
        this.generateWalls()

        Events.unlockArea.connect( ( area ) => {
            this.unlockWall( area )
            this.pruchaseGui.Enabled = false
        } )
        this.exitButton.MouseButton1Click.Connect( () => this.pruchaseGui.Enabled = false )
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
            guiClone.Price.Text = FormatCompact( AreaWallConfig[area].coin_price )

            wallInstance.Touched.Connect( ( otherPart ) => {
                const player = Players.GetPlayerFromCharacter(otherPart.Parent)
                if ( !player || player !== this.player ) return
                this.selectedArea = area

                this.pruchaseGui.Frame.Area.Text = area.gsub( "_", " " )[0]
                this.pruchaseGui.Frame.Price.Text = FormatCompact( AreaWallConfig[area].coin_price )
                this.pruchaseGui.Enabled = true
            })
        } )
    }

    private requestUnlockWall () {
        if ( !this.selectedArea ) return

        const money = clientStore.getState().data.money
        const price = AreaWallConfig[this.selectedArea].coin_price
        if ( money < price ) return

        Events.unlockArea.fire(this.selectedArea)
    }

    private unlockWall ( area: Area ) {
        const areaFolder = this.areasFolder.FindFirstChild( area )!
        const wallInstance = areaFolder.FindFirstChild( "Wall" )
        if ( !wallInstance ) return
        wallInstance.Destroy()
    }

}