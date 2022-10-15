import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { Boost, BOOSTS, BOOSTS_CONFIG, BOOST_DESCRIPTIONS, BOOST_IMAGES } from "shared/constants/Boosts";
import { PET_CONFIG, PetInstanceProps, RARITIES, RARITY_COLORS, UUID, Rarity } from "shared/constants/Pets";
import { timeToString } from "shared/util/functions/timeToString";
import { NotificationsController } from "./NotificationsController";

@Controller({})
export class PetInventoryController implements OnStart {
    private notificationsController = Dependency( NotificationsController )

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private gui = <StarterGui["BoostInventory"]>this.playerGui.WaitForChild("BoostInventory")
    private frame = this.gui.Frame

    private info = this.frame.Info
    private container = this.frame.Container

    private template = this.container.Template

    private useButton = this.info.Use

    private selectedBooster: Boost | undefined
    private selectedBoosterRarity: Rarity | undefined

    private dataLoaded = false
    private connection = clientStore.changed.connect( ( newState ) => {
        if ( !this.dataLoaded ) newState.data.boost_inventory.forEach( ( rarities, boost ) => {
            for ( const [rarity, duration] of pairs( rarities ) )
                this.updateBoost( boost, rarity )
            })
        else this.connection.disconnect()
    })

    onStart () {
        this.generateBoosts()

        this.useButton.MouseButton1Click.Connect( () => this.useBoost() )
        Events.useBoost.connect((boost, rarity) => task.defer(() => this.updateBoost(boost, rarity)))
        Events.gainBoost.connect( ( boost, rarity ) => task.defer( () => this.updateBoost( boost, rarity ) ) )
    }

    private getTemplate ( boost: Boost, rarity: Rarity ): typeof this.template | undefined {
        let template
        this.container.GetChildren().forEach( ( child ) => {
            if ( !child.IsA( "ImageButton" ) || child.Name !== boost ) return
            const templateRarity = child.GetAttribute( "rarity" )
            if ( rarity === templateRarity ) template = <typeof this.template>child
        })
        return template
    }

    private updateBoost ( boost: Boost, rarity: Rarity ) {
        this.dataLoaded = true
        const template = this.getTemplate( boost, rarity )
        if ( !template ) return

        const amount = clientStore.getState().data.boost_inventory.get( boost )![rarity]
        template.Amount.Text = tostring( amount )
        if (amount > 0) this.notificationsController.createNotification("+AMOUNT RARITY TYPE Booster!", {amount: amount, rarity: rarity, type: boost})
    }

    private generateBoosts () {
        clientStore.getState().data.boost_inventory.forEach( ( props, boost ) => {
            for ( const [rarity, amount] of pairs( props ) ) {
                const clone = this.template.Clone()
                clone.Parent = this.container
                clone.Name = boost
                clone.SetAttribute( "rarity", rarity )
                clone.Visible = true

                clone.BackgroundColor3 = RARITY_COLORS[rarity]
                clone.Boost.Image = BOOST_IMAGES[boost]
                clone.Amount.Text = tostring( amount )

                clone.MouseButton1Click.Connect( () => this.selectBoost(boost, rarity) )
            }
        })
    }

    private selectBoost ( boost: Boost, rarity: Rarity ) {
        this.selectedBooster = boost
        this.selectedBoosterRarity = rarity

        this.info.Boost.Image = BOOST_IMAGES[boost]
        this.info.Boost.BackgroundColor3 = RARITY_COLORS[rarity]
        this.info.BoostName.Text = boost
        this.info.Description.Text = `${BOOSTS_CONFIG[boost][rarity]}x ${BOOST_DESCRIPTIONS[boost]}`
        this.info.Visible = true
    }

    private useBoost () {
        if ( !this.selectedBooster || !this.selectedBoosterRarity ) return

        Events.useBoost.fire(this.selectedBooster, this.selectedBoosterRarity)
    }

}