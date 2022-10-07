import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { Boosts, BOOST_IMAGES } from "shared/constants/Boosts";
import { Rarities, RarityColors } from "shared/constants/Pets";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";

@Controller({})
export class BoostController implements OnInit {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private gui = <StarterGui["ActiveBoosts"]>this.playerGui.WaitForChild("ActiveBoosts")
    private frame = this.gui.Frame

    private template = this.frame.Template

    private dataLoaded = false
    private connection = clientStore.changed.connect( ( newState ) => {
        if ( !this.dataLoaded ) newState.data.active_boosts.forEach( ( props, boost ) => this.generateBoost( boost, props.rarity ) )
        else this.connection.disconnect()
    })

    onInit () {
        clientStore.getState().data.active_boosts.forEach( ( props, boost ) => this.generateBoost( boost, props.rarity ) )

        Events.useBoost.connect( ( boost, rarity ) => task.defer(() => this.generateBoost( boost, rarity )) )
        task.spawn(() => this.updateBoostTime())
    }

    private generateBoost ( boost: Boosts, rarity: Rarities ) {
        this.dataLoaded = true
        const clone = this.template.Clone()
        clone.Parent = this.frame
        clone.Visible = true
        clone.Name = boost
        clone.BackgroundColor3 = RarityColors[rarity]
        clone.Image = BOOST_IMAGES[boost]
        clone.Duration.Text = tostring(clientStore.getState().data.active_boosts.get(boost)?.duration)
    }


    private updateBoostTime () {
        while ( true ) {
            this.frame.GetChildren().forEach( ( clone ) => {
                if ( !clone.IsA( "ImageLabel" ) || !clone.Visible ) return

                const durationLabel = <TextLabel>clone.FindFirstChild( "Duration" )
                if ( !durationLabel ) return

                const booster = <Boosts>clone.Name
                const activeBoostInstance = clientStore.getState().data.active_boosts.get( booster )
                if ( !activeBoostInstance ) return

                const duration = activeBoostInstance.duration - 1
                clientStore.dispatch( { type: "updateBoost", boost: booster, duration: duration } )

                durationLabel.Text = tostring( duration )

                if ( duration === 0 ) {
                    clientStore.dispatch( { type: "endBoost", boost: booster } )
                    clone.Destroy()
                }
            })
            task.wait(1)
        }
    }

}