import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import Signal from "@rbxts/signal";
import { Events } from "server/network";

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

@Component({tag: "Pile"})
export class PileComponent extends BaseComponent<Attributes, Pile> implements OnStart {
    private activePlayers: Player[] = []

    onStart () {
        this.maid.GiveTask(this.instance)
        this.onAttributeChanged("health", () => this.death())
    }

    private death () {
        if ( this.attributes.health <= 0 ) {
            this.destroy()
        }
    }

    public reduceHealth ( player: Player, amount: number ) {
        this.attributes.health -= amount
        if (!this.activePlayers.includes(player)) this.activePlayers.push(player)
    }

    public notifyHealthUpdate () {
        Events.updatePileHealth.fire(this.activePlayers, this.attributes.uuid)
    }

}