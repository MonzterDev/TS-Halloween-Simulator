import { Components } from "@flamework/components";
import { Service, OnStart, OnInit, OnRender, OnTick, Dependency } from "@flamework/core";
import { CollectionService, HttpService, Players, ServerStorage, Workspace } from "@rbxts/services";
import { PileComponent } from "server/components/PileComponent";
import { PlayerDataService } from "./PlayerDataService";

const PLAYER_RANGE = 10

@Service({})
export class PointsService implements OnInit, OnTick {
    private components = Dependency( Components )
    private playerDataService = Dependency( PlayerDataService )

    private pilesFolder = Workspace.Piles
    private pileModel = ServerStorage.Candy

    private activePiles: Map<string, PileComponent> = new Map()

    onInit () {
        this.generatePiles()
    }

    private generatePiles () {
        this.pilesFolder.GetChildren().forEach( ( instance ) => {
            if ( !instance.IsA( "BasePart" ) ) return
            const uuid = HttpService.GenerateGUID(false)
            const clone = this.pileModel.Clone()
            clone.Parent = this.pilesFolder
            clone.PivotTo(instance.CFrame)
            clone.Name = uuid

            clone.SetAttribute( "uuid", uuid )
            clone.SetAttribute( "health", 10)
            clone.SetAttribute( "multiplier", 1)

            CollectionService.AddTag( clone, "Pile" )

            task.defer(() => { // Component takes time to generate
                const pileComponent = this.components.getComponent<PileComponent>( clone )
                if ( pileComponent ) {
                    this.activePiles.set( uuid, pileComponent )
                    pileComponent.destroyed.Connect((uuid) => this.activePiles.delete(uuid))
                }
            } )
        })
    }

    onTick ( dt: number ): void {
        Players.GetPlayers().forEach( ( player ) => {
            const character = player.Character
            if ( !character ) return
            const piles = this.getPilesInRange( player )
            piles?.forEach((pile) => this.collectPile(player, pile))
        })
        task.wait(.5)
    }

    private collectPile ( player: Player, pile: PileComponent ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const health = pile.attributes.health
        const damage = 1

        pile.attributes.health -= damage
        profile.adjustCandy(damage)
    }

    private getPilesInRange ( player: Player ) {
        const character = player.Character
        if ( !character ) return
        const humanoidRootPart = <BasePart>character.FindFirstChild("HumanoidRootPart")
        const nearbyPiles: PileComponent[] = []
        this.activePiles.forEach( ( pile, uuid ) => {
            const hitbox = pile.instance.PrimaryPart!
            const distanceBetween = hitbox.Position.sub( humanoidRootPart.Position ).Magnitude
            if ( distanceBetween < PLAYER_RANGE ) {
                nearbyPiles.push( pile )
            }
        } )
        return nearbyPiles
    }

}