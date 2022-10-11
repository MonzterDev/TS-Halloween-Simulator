import { Components } from "@flamework/components";
import { Service, OnStart, OnInit, OnRender, OnTick, Dependency } from "@flamework/core";
import { CollectionService, HttpService, Players, ServerStorage, Workspace } from "@rbxts/services";
import { PileComponent } from "server/components/PileComponent";
import { Events } from "server/network";
import { getLuckStat, getPowerStat, getRangeStat, getSizeStat } from "server/utils/Stats";
import { AreaPileConfig } from "shared/constants/Areas";
import { PilesConfig } from "shared/constants/Piles";
import { PlayerDataService } from "./PlayerDataService";
import { QuestsService } from "./QuestsService";

@Service({})
export class PilesService implements OnInit {
    private components = Dependency( Components )
    private playerDataService = Dependency( PlayerDataService )
    private questsService = Dependency( QuestsService )

    private areaFolder = Workspace.Piles
    private pileModels = ServerStorage.Piles


    onInit () {
        this.generatePiles()
        task.spawn(() => this.startLoop())
    }

    private generatePiles () {
        this.areaFolder.GetChildren().forEach( ( folder ) => {
            const areaConfig = AreaPileConfig[folder.Name]
            folder.GetChildren().forEach( ( spawnPart ) => {
                if ( !spawnPart.IsA( "BasePart" ) ) return
                const pileConfig = PilesConfig[spawnPart.Name]
                const health = pileConfig.health * areaConfig.health_multiplier
                const uuid = HttpService.GenerateGUID( false )

                const clone = <Model>this.pileModels.FindFirstChild(spawnPart.Name)!.Clone()
                clone.Parent = this.areaFolder
                clone.PivotTo(spawnPart.CFrame)
                clone.Name = uuid

                clone.SetAttribute( "uuid", uuid )
                clone.SetAttribute( "health", health)
                clone.SetAttribute( "max_health", health)

                CollectionService.AddTag( clone, "Pile" )
            })
        })
    }

    private startLoop () {
        while ( true ) {
            Players.GetPlayers().forEach( ( player ) => {
                const profile = this.playerDataService.getProfile( player )
                if ( !profile ) return

                const storage = getSizeStat( player )
                if (profile.data.candy >= storage) return

                const piles = this.getPilesInRange( player )
                piles?.forEach((pile) => this.collectPile(player, pile))
            } )
            this.updatePileHealth()
            task.wait(.5)
        }
    }


    /**
     * This function exists in a way to save space with Networking
     * We'll only send the Player's an HP update, once all Players have damaged a pile
     */
    private updatePileHealth () {
        this.components.getAllComponents<PileComponent>().forEach( ( pile ) => {
            pile.notifyHealthUpdate()
        })
    }

    private collectPile ( player: Player, pile: PileComponent ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile || !pile.isAlive ) return

        const damage = getPowerStat( player )
        const luck = getLuckStat( player )

        const wasLucky = math.random( 0, 100 ) < luck
        let bonusReward = 0

        pile.reduceHealth( player, damage )

        const storage = getSizeStat( player )
        const currentCandy = profile.data.candy
        let reward = damage
        if ( currentCandy + damage > storage ) reward = storage - currentCandy
        if ( wasLucky ) bonusReward = math.round( damage / ( math.random( 20, 100 ) / 100 ) )
        reward += bonusReward

        profile.adjustCandy( reward )
        this.questsService.addPoint(player, "Candy Collector", 0, reward)
        if (wasLucky) Events.luckyReward.fire(player, bonusReward)
    }

    private getPilesInRange ( player: Player ) {
        const character = player.Character
        if ( !character ) return
        const playerCollectionRange = getRangeStat(player)
        const humanoidRootPart = <BasePart>character.FindFirstChild("HumanoidRootPart")
        const nearbyPiles: PileComponent[] = []

        const activePiles = this.components.getAllComponents<PileComponent>()
        activePiles.forEach( ( pile ) => {
            if (!pile.isAlive) return
            const hitbox = pile.instance.PrimaryPart!
            const distanceBetween = hitbox.Position.sub( humanoidRootPart.Position ).Magnitude
            if ( distanceBetween < playerCollectionRange ) nearbyPiles.push( pile )
        } )

        return nearbyPiles
    }

}