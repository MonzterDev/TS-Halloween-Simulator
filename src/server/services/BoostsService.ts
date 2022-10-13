import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "server/network";
import { Boost, BOOSTS, BOOST_DURATION } from "shared/constants/Boosts";
import { RARITIES, Rarity } from "shared/constants/Pets";
import { PlayerDataService } from "./PlayerDataService";


@Service({})
export class BoostsService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)

    onStart () {
        Events.useBoost.connect( ( player, boost, rarity ) => this.useBoost( player, boost, rarity ) )
        task.spawn(() => this.updateBoosts())
    }

    public rewardBoost ( player: Player, boost: Boost, rarity: Rarity, amount: number = 1 ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        profile.data.boost_inventory.get( boost )![rarity] += amount
        task.spawn( () => {
            while ( amount > 0 ) {
                Events.gainBoost.fire(player, boost, rarity)
                amount -= 1
                task.wait()
            }
        })
    }

    private useBoost ( player: Player, boost: Boost, rarity: Rarity ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const boostInventory = profile.data.boost_inventory
        const amountOfBoost = boostInventory.get( boost )![rarity]
        if ( amountOfBoost === 0 ) return

        const activeBoosts = profile.data.active_boosts
        const isBoostActive = activeBoosts.get( boost )
        if ( isBoostActive ) return

        activeBoosts.set( boost, { rarity: rarity, duration: BOOST_DURATION } )
        boostInventory.get( boost )![rarity] -= 1
        Events.useBoost.fire(player, boost, rarity)
    }

    private updateBoosts () {
        while ( true ) {
            Players.GetPlayers().forEach( ( player ) => {
                const profile = this.playerDataService.getProfile( player )
                if ( !profile ) return

                const activeBoosts = profile.data.active_boosts
                // for ( const [boost, props] of pairs( activeBoosts ) ) {
                //     props.duration -= 1
                //     if (props.duration === 0) activeBoosts.delete(boost)
                // }

                // for ( let i = 0; i < activeBoosts.size(); i++ ) {
                //     const info = activeBoosts
                //     print(info.uuid, "ZZZZZZZZZZZZZZZZ")
                //     if ( equippedPets.includes( info.uuid ) ) {
                //         topPets.remove( i )
                //         i--
                //         equippedPets.remove(equippedPets.indexOf(info.uuid))
                //     }
                // }

                activeBoosts.forEach( ( props, boost ) => {
                    props.duration -= 1
                    if ( props.duration === 0 ) activeBoosts.delete( boost )
                })
            })
            task.wait(1)
        }
    }

    public getActiveBoosts ( player: Player ): Map<Boost, Rarity> {
        const activeBoosts: Map<Boost, Rarity> = new Map()

        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return activeBoosts

        const currentActives = profile.data.active_boosts
        currentActives.forEach((props, boost) => activeBoosts.set(boost, props.rarity))

        return activeBoosts
    }
}