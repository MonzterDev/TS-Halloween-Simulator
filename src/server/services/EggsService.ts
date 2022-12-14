import { Service, OnStart, Dependency } from "@flamework/core";
import { GameAnalytics } from "@rbxts/gameanalytics";
import { PolicyService, Workspace } from "@rbxts/services";
import { Events, Functions } from "server/network";
import { getLuckStat } from "server/utils/Stats";
import { EggPetProps, EGG_SHOP_CONFIG, Pet, Egg, getMaxPetsStored, getEggHatchChance, getEggLuckStat } from "shared/constants/Pets";
import { HatchEggResponse } from "shared/network";
import { PlayerCooldown } from "shared/util/classes/PlayerCooldown";
import { PetsService } from "./PetsService";
import { PlayerDataService } from "./PlayerDataService";
import { TutorialSerivce } from "./TutorialSerivce";

@Service({})
export class EggsService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)
    private petsService = Dependency( PetsService )
    private tutorialSerivce = Dependency( TutorialSerivce )

    private playerCooldown = new PlayerCooldown(3)

    onStart () {
        Functions.hatchEgg.setCallback( ( player, egg ) => this.hatchEgg( player, egg ) )
        Events.autoDeletePet.connect((player, egg, pet) => this.autoDeletePet(player, egg, pet))
    }

    private hatchEgg ( player: Player, egg: Egg ): HatchEggResponse {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const hasRemoveHatchCooldownGamepass = profile.data.gamepasses.get( "Remove Hatch Cooldown" )
        if ( !this.playerCooldown.cooldownIsFinished( player ) && !hasRemoveHatchCooldownGamepass ) return

        const userPolicy = PolicyService.GetPolicyInfoForPlayerAsync( player ) // Probably should implement differently
        if (userPolicy.ArePaidRandomItemsRestricted) return

        let amountOfHatches = 1

        const eggConfig = EGG_SHOP_CONFIG[egg]

        const hasTripleHatchGamepass = profile.data.gamepasses.get("Triple Hatch")
        const hasTripleHatchEnabled = profile.data.settings.get("Triple Hatch")

        const money = profile.data.money
        const price = eggConfig.price

        if ( hasTripleHatchGamepass && hasTripleHatchEnabled ) {
            if ( money >= price * 3 ) amountOfHatches = 3
        }

        const storedPets = profile.data.pet_inventory.size()
        let maxStorage = getMaxPetsStored(profile.data)
        const hasStorage = storedPets + amountOfHatches <= maxStorage
        if (!hasStorage) return

        this.playerCooldown.giveCooldown( player )

        const pets: Pet[] = []
        while ( amountOfHatches > 0 ) {
            amountOfHatches -= 1

            if ( money < price ) break

            const maxStoredPets = this.petsService.getMaxPetStorage( player )
            const sotredPets = profile.data.pet_inventory.size()
            if ( maxStoredPets === sotredPets ) break

            profile.adjustMoney( -eggConfig.price )

            const pity = profile.data.pet_egg_pity.get( egg )

            const luck = getEggLuckStat(profile.data)
            let pet = this.choosePet( eggConfig.pets, luck )

            if ( pity! >= 100 ) {
                pet = this.chooseRarestPet( eggConfig.pets )
                profile.data.pet_egg_pity.set( egg, 0 )
                Events.resetEggPity.fire(player, egg)
            }

            profile.data.pet_egg_pity.set( egg, profile.data.pet_egg_pity.get( egg )! + 1 )
            Events.increaseEggPity.fire(player, egg)

            pets.push(pet!)
            const rarity = eggConfig.pets[pet!]?.rarity

            const shouldDelete = profile.data.pet_auto_delete.get( egg )?.get( pet! )
            if (!shouldDelete) this.petsService.rewardPet( player, pet!, rarity! )
            task.wait()
        }
        GameAnalytics.addDesignEvent( player.UserId, { eventId: `Hatch:${egg}` } )
        this.tutorialSerivce.completeTutorial( player, "hatch_pet" )
        return pets
    }

    private choosePet ( pets: EggPetProps, luck: number ) {
        let totalWeight = 0
        for ( const [pet, props] of pairs( pets ) ) {
            totalWeight += props.chance
            // totalWeight += props.chance < 10 ? props.chance * luck : props.chance
        }

        const chance = math.random( 1, totalWeight )
        let counter = 0
        for ( const [pet, props] of pairs( pets ) ) {
            counter += props.chance < 10 ? props.chance * luck : props.chance
            if (chance <= counter) return pet
        }
    }

    private chooseRarestPet ( pets: EggPetProps ) {
        let rarestPet
        let chance = 100
        for ( const [pet, props] of pairs( pets ) ) {
            if (props.chance < chance) {
                rarestPet = pet
                chance = props.chance
            }
        }

        return rarestPet
    }

    private autoDeletePet (player: Player, egg: Egg, pet: Pet) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const isEnabled = profile.data.pet_auto_delete.get(egg)?.get(pet)
        profile.data.pet_auto_delete.get( egg )?.set( pet, !isEnabled )
        Events.autoDeletePet.fire(player, egg, pet)
    }
}