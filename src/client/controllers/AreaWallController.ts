import { Controller, OnStart, OnInit } from "@flamework/core";
import { FormatCompact } from "@rbxts/format-number";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { Area, AreaWallConfig } from "shared/constants/Areas";
import { Boosts, BOOST_IMAGES } from "shared/constants/Boosts";
import { Rarities, RarityColors } from "shared/constants/Pets";

@Controller({})
export class BoostController implements OnInit {

    private areasFolder = Workspace.Areas

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private folder = <StarterGui["AreaWalls"]>this.playerGui.WaitForChild( "AreaWalls" )

    private promptTemplate = this.folder.Unlock
    private guiTemplate = this.folder.AreaDisplay


    onInit () {
        task.delay( 1, () => {
            this.prugeWalls()
            this.generateWalls()
        } )
    }

    private prugeWalls () {
        const areaData = clientStore.getState().data.areas_unlocked
        for ( const [area, unlocked] of pairs( areaData ) ) {
            if ( !unlocked ) return
            const areaFolder = this.areasFolder.FindFirstChild( area )
            if ( !areaFolder ) return

            const wallInstance = <Part>areaFolder.FindFirstChild( "Wall" )
            wallInstance.Destroy()
        }
    }

    private generateWalls () {
        this.areasFolder.GetChildren().forEach( ( areaFolder ) => {
            const area = areaFolder.Name
            const wallInstance = areaFolder.FindFirstChild( "Wall" )
            if ( !wallInstance ) return

            const attachment = wallInstance.FindFirstChildOfClass("Attachment")

            const promptClone = this.promptTemplate.Clone()
            promptClone.Enabled = true
            promptClone.Parent = attachment
            promptClone.Triggered.Connect( () => print( "Touched" ) )

            const guiClone = this.guiTemplate.Clone()
            guiClone.Enabled = true
            guiClone.Parent = attachment
            guiClone.Area.Text = area.gsub( "_", " " )[0]
            guiClone.Price.Text = FormatCompact(AreaWallConfig[area].coin_price)
        })

    }

}