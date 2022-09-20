import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Events } from "server/network";
import { makeDescendantsInvisible } from "shared/util/functions/makeDescendantsInvisible";

interface Attributes {
    uuid: string
    health: number
    max_health: number
}

interface Pile extends Model {
    Bowl: Part & {
        Mesh: SpecialMesh
    }
    Part: Part & {
        Mesh: SpecialMesh
    }
}

const RESPAWN_DELAY = 5

@Component({tag: "Pile"})
export class PileComponent extends BaseComponent<Attributes, Pile> implements OnStart {
    public isAlive = true
    private activePlayers: Player[] = []
    private previousHealth = this.attributes.health

    onStart () {
        this.maid.GiveTask(this.instance)
        this.onAttributeChanged("health", () => this.death())
    }

    private death () {
        if ( this.attributes.health <= 0 && this.isAlive) {
            this.isAlive = false
            makeDescendantsInvisible( this.instance, true )
            this.activePlayers.clear()

            task.delay( RESPAWN_DELAY, () => {
                this.attributes.health = this.attributes.max_health
                this.isAlive = true
                makeDescendantsInvisible( this.instance, false )
                this.activePlayers.clear()
            })
        }
    }

    public reduceHealth ( player: Player, amount: number ) {
        this.attributes.health -= amount
        if ( !this.activePlayers.includes( player ) ) this.activePlayers.push( player )
    }

    public notifyHealthUpdate () {
        if ( this.attributes.health === this.previousHealth ) return
        this.previousHealth = this.attributes.health
        Events.updatePileHealth.fire(this.activePlayers, this.attributes.uuid)
    }

}