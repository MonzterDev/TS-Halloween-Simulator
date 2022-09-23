import { Service, OnInit, Dependency } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { EggPetProps, EggShopConfig, EggTypes } from "shared/constants/Pets";
import { PlayerCooldown } from "shared/util/classes/PlayerCooldown";
import { PetsService } from "./PetsService";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class EggsService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)
    private petsService = Dependency( PetsService )

    private playerCooldown = new PlayerCooldown(5)
    private eggs = Workspace.Eggs

    onInit () {
        this.generateEggs()
    }

    private generateEggs () {
        this.eggs.GetChildren().forEach( ( egg ) => {
            const prompt = <ProximityPrompt>egg.FindFirstChild( "Prompt" )
            prompt.Triggered.Connect( ( player ) => this.hatchEgg(player, <EggTypes>egg.Name))
        })
    }

    private hatchEgg ( player: Player, egg: EggTypes ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return
        if ( !this.playerCooldown.cooldownIsFinished( player ) && !profile.data.gamepasses.remove_hatch_cooldown ) return

        const eggConfig = EggShopConfig[egg]

        if ( profile.data.money < eggConfig.price ) return
        if (profile.data.pet_info.max_stored === profile.data.pet_inventory.size()) return
        profile.adjustMoney( -eggConfig.price )

        const pet = this.choosePet( eggConfig.pets )
        const rarity = eggConfig.pets[pet!]?.rarity
        this.petsService.rewardPet( player, pet!, rarity! )
        this.playerCooldown.giveCooldown(player)
    }

    private choosePet ( pets: EggPetProps ) {
        let totalWeight = 0
        for ( const [pet, props] of pairs(pets) ) totalWeight += props.chance

        const chance = math.random( 1, totalWeight )
        let counter = 0
        for ( const [pet, props] of pairs(pets) ) {
            counter += props.chance
            if (chance <= counter) return pet
        }
    }

}