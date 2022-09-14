import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import Signal from "@rbxts/signal";

interface Attributes {
    uuid: string
    health: number
    multiplier: number
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

    /**
     * Fired when the component is destroyed
     */
    public destroyed = new Signal<( uuid: string ) => void>()

    onStart () {
        this.maid.GiveTask(this.instance)
        this.maid.GiveTask(this.destroyed)
        this.onAttributeChanged("health", () => this.death())
    }

    private death () {
        if ( this.attributes.health <= 0 ) {
            this.destroyed.Fire(this.attributes.uuid)
            this.destroy()
        }
    }

    public reduceHealth ( amount: number ) {
        this.attributes.health -= amount
    }

}