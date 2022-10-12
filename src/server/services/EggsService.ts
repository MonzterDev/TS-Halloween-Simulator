import { Service, OnInit, Dependency } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Events, Functions } from "server/network";
import { EggPetProps, EggShopConfig, EggTypes, PetTypes } from "shared/constants/Pets";
import { HatchEggResponse } from "shared/network";
import { PlayerCooldown } from "shared/util/classes/PlayerCooldown";
import { PetsService } from "./PetsService";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class EggsService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)
    private petsService = Dependency( PetsService )

    private playerCooldown = new PlayerCooldown(3)

    onInit () {
        Functions.hatchEgg.setCallback( ( player, egg ) => this.hatchEgg( player, egg ) )
        Events.autoDeletePet.connect((player, egg, pet) => this.autoDeletePet(player, egg, pet))
    }

    private hatchEgg ( player: Player, egg: EggTypes ): HatchEggResponse {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const hasRemoveHatchCooldownGamepass = profile.data.gamepasses.remove_hatch_cooldown
        if ( !this.playerCooldown.cooldownIsFinished( player ) && !hasRemoveHatchCooldownGamepass ) return

        let amountOfHatches = 1

        const eggConfig = EggShopConfig[egg]

        const hasTrippleHatchGamepass = profile.data.gamepasses.tripple_hatch
        const hasTrippleHatchEnabled = profile.data.settings.tripple_hatch

        const money = profile.data.money
        const price = eggConfig.price

        if ( hasTrippleHatchGamepass && hasTrippleHatchEnabled ) {
            if ( money >= price * 3 ) amountOfHatches = 3
        }

        this.playerCooldown.giveCooldown( player )

        const pets: PetTypes[] = []
        while ( amountOfHatches > 0 ) {
            amountOfHatches -= 1

            if ( money < price ) break

            const maxStoredPets = this.petsService.getMaxPetStorage( player )
            const sotredPets = profile.data.pet_inventory.size()
            if ( maxStoredPets === sotredPets ) break

            profile.adjustMoney( -eggConfig.price )

            const pet = this.choosePet( eggConfig.pets )
            pets.push(pet!)
            const rarity = eggConfig.pets[pet!]?.rarity

            const shouldDelete = profile.data.pet_auto_delete.get( egg )?.get( pet! )
            if (!shouldDelete) this.petsService.rewardPet( player, pet!, rarity! )
            task.wait()
        }
        return pets
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

    private autoDeletePet (player: Player, egg: EggTypes, pet: PetTypes) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const isEnabled = profile.data.pet_auto_delete.get(egg)?.get(pet)
        profile.data.pet_auto_delete.get( egg )?.set( pet, !isEnabled )
        Events.autoDeletePet.fire(player, egg, pet)
    }
}