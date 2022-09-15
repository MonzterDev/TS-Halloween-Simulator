import { Controller, OnStart, OnInit } from "@flamework/core";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Events } from "client/network";

type HealthDisplay = BillboardGui & {
		Health: TextLabel;
		Bar: ImageLabel & {
			Progress: ImageLabel;
		};
};


@Controller({})
export class PilesController implements OnInit {
    private healthDisplay = ReplicatedStorage.HealthDisplay
    private piles = Workspace.Piles

    onInit () {
        Events.updatePileHealth.connect((uuid) => this.updateHeatlth(uuid))
    }


    private updateHeatlth ( uuid: string ) {
        const pile = <Model>this.piles.FindFirstChild( uuid )
        if ( !pile ) return

        let healthGui = <HealthDisplay>pile?.FindFirstChild( "HealthDisplay" )
        if ( !healthGui ) {
            healthGui = this.createHealthDisplay(pile)
        }

        const maxHealth = <number>pile.GetAttribute("max_health")
        const health = <number>pile.GetAttribute("health")

        healthGui.Health.Text = tostring( health )
        healthGui.Bar.Progress.Size = UDim2.fromScale( health / maxHealth, 1 )

        healthGui.Enabled = health > 0
    }

    private createHealthDisplay (pile: Model) {
        const clone = this.healthDisplay.Clone()
        clone.Parent = pile
        return clone
    }
}