import { Controller, OnStart, OnInit, OnTick } from "@flamework/core";
import { Players, RunService, Workspace } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { clientStore } from "client/rodux/rodux";
import { Area } from "shared/constants/Areas";

@Controller({})
export class AreaController implements OnStart {
    private player = Players.LocalPlayer

    public areaChanged = new Signal<( area: Area ) => void>();
    public currentArea: Area = "Spawn"

    onStart () {
        this.areaListener()
        this.player.RespawnLocation = Workspace.Areas.Spawn.Spawn

        this.player.CharacterAdded.Connect( ( character ) => {
            const connection = RunService.Heartbeat.Connect( () => {
                const primaryPart = character.PrimaryPart
                if (!primaryPart) return

                character.PivotTo( this.player.RespawnLocation!.CFrame )

                if ( ( primaryPart.Position.sub( this.player.RespawnLocation!.Position ) ).Magnitude < 5 ) connection.Disconnect()
            } )
        } )

        const character = this.player.Character
        if ( character && this.player.UserId !== 811308495 ) character.PivotTo( this.player.RespawnLocation!.CFrame ) // Spawn at spawn
    }

    private areaListener () {
        Workspace.Areas.GetChildren().forEach( ( areaFolder ) => {
            const areaPart = <Part>areaFolder.FindFirstChild( "Area" )
            if ( !areaPart ) return

            areaPart.Touched.Connect( ( otherPart ) => {
                if (areaFolder.Name === this.currentArea) return
                if (!otherPart.IsA("BasePart")) return

                const player = Players.GetPlayerFromCharacter( otherPart.Parent )
                if ( !player || player !== this.player ) return

                const isUnlocked = clientStore.getState().data.areas_unlocked[areaFolder.Name]
                if (!isUnlocked) return

                this.player.RespawnLocation = areaFolder.FindFirstChildOfClass( "SpawnLocation" )
                this.currentArea = areaFolder.Name
                this.areaChanged.Fire(this.currentArea)
            })
        })
    }

    public getPart (part: "Spawn" | "Sell" | "Area" | "Shop" | "Wall", area: Area = this.currentArea): Part {
        const areaFolder = <Workspace["Areas"]["Spawn"]>Workspace.Areas.FindFirstChild( area )
        return <Part> areaFolder.FindFirstChild(part)
    }
}