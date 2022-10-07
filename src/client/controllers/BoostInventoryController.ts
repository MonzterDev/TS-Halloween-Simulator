import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { CleanViewport, GenerateViewport } from "@rbxts/viewport-model";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { Boosts, BoostsConfig, BOOST_DESCRIPTIONS, BOOST_IMAGES } from "shared/constants/Boosts";
import { PetConfig, PetInstanceProps, Rarities, RarityColors, UUID } from "shared/constants/Pets";
import { PetsController } from "./PetsController";

@Controller({})
export class PetInventoryController implements OnInit {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private gui = <StarterGui["BoostInventory"]>this.playerGui.WaitForChild("BoostInventory")
    private frame = this.gui.Frame

    private info = this.frame.Info
    private container = this.frame.Container

    private template = this.container.Template

    private useButton = this.info.Use

    private selectedBooster: Boosts | undefined
    private selectedBoosterRarity: Rarities | undefined

    onInit () {
        this.generateBoosts()
        this.useButton.MouseButton1Click.Connect( () => this.useBoost() )
        Events.useBoost.connect((boost, rarity) => task.defer(() => this.updateBoost(boost, rarity)))
        Events.gainBoost.connect( ( boost, rarity ) => task.defer( () => this.updateBoost( boost, rarity ) ) )
        task.delay(1, () => clientStore.getState().data.boost_inventory.forEach( ( rarities, boost ) => {
            for ( const [rarity, duration] of pairs( rarities ) ) this.updateBoost(boost, rarity)
        }))
    }

    private getTemplate ( boost: Boosts, rarity: Rarities ): typeof this.template | undefined {
        let template
        this.container.GetChildren().forEach( ( child ) => {
            if ( !child.IsA( "ImageButton" ) || child.Name !== boost ) return
            const templateRarity = child.GetAttribute( "rarity" )
            if ( rarity === templateRarity ) template = <typeof this.template>child
        })
        return template
    }

    private updateBoost ( boost: Boosts, rarity: Rarities ) {
        const template = this.getTemplate( boost, rarity )!
        template.Amount.Text = tostring( clientStore.getState().data.boost_inventory.get( boost )![rarity] )
    }

    private generateBoosts () {
        clientStore.getState().data.boost_inventory.forEach( ( props, boost ) => {
            for ( const [rarity, amount] of pairs( props ) ) {
                const clone = this.template.Clone()
                clone.Parent = this.container
                clone.Name = boost
                clone.SetAttribute( "rarity", rarity )
                clone.Visible = true

                clone.BackgroundColor3 = RarityColors[rarity]
                clone.Boost.Image = BOOST_IMAGES[boost]
                clone.Amount.Text = tostring( amount )

                clone.MouseButton1Click.Connect( () => this.selectBoost(boost, rarity) )
            }
        })
    }

    private selectBoost ( boost: Boosts, rarity: Rarities ) {
        this.selectedBooster = boost
        this.selectedBoosterRarity = rarity

        this.info.Boost.Image = BOOST_IMAGES[boost]
        this.info.Boost.BackgroundColor3 = RarityColors[rarity]
        this.info.BoostName.Text = boost
        this.info.Description.Text = `${BoostsConfig[boost][rarity]}x ${BOOST_DESCRIPTIONS[boost]}`
        this.info.Visible = true
    }

    private useBoost () {
        if ( !this.selectedBooster || !this.selectedBoosterRarity ) return

        Events.useBoost.fire(this.selectedBooster, this.selectedBoosterRarity)
    }

}