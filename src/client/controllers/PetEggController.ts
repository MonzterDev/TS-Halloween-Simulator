import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { BoatTween } from "@rbxts/boat-tween";
import Make from "@rbxts/make";
import { Debris, Lighting, Players, ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { CleanViewport, GenerateViewport } from "@rbxts/viewport-model";
import { Events, Functions } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { EGG_SHOP_CONFIG, EGGS, PETS, Pet, Egg, getMaxPetsStored, RARITY_COLORS } from "shared/constants/Pets";
import { cleanString } from "shared/util/functions/cleanString";
import { NotificationsController } from "./NotificationsController";

type PetTemplate = StarterGui["PetEgg"]["InfoGui"]["Background"]["Frame"]["Container"]["Template"]

const MAX_DISTANCE_FROM_EGG = 25

@Controller({})
export class PetEggController implements OnStart {
    private notificationsController = Dependency(NotificationsController)

    private eggs = Workspace.Eggs

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private folder = <StarterGui["PetEgg"]>this.playerGui.WaitForChild( "PetEgg" )
    private infoGui = this.folder.InfoGui
    private interact = this.folder.InteractGui

    private animation = this.folder.Animation

    private isAutoHatching = false

    onStart () {
        this.eggs.GetChildren().forEach((child) => this.generateEgg(<Egg> child.Name))
        Events.autoDeletePet.connect( ( egg, pet ) => task.defer( () => this.autoDeletePet( egg, pet ) ) )
        Events.resetEggPity.connect( ( egg ) => this.resetPity( egg ) )
        Events.increaseEggPity.connect((egg) => task.defer(() => this.increaseEggPity(egg)))
    }

    private increaseEggPity ( egg: Egg ) {
        const infoGui = <typeof this.infoGui>this.folder.FindFirstChild( egg )?.FindFirstChild( "InfoGui" )
        if ( !infoGui ) return

        const pity = clientStore.getState().data.pet_egg_pity.get( egg )!

        infoGui.Background.Frame.Pity.Bar.Size = UDim2.fromScale( pity / 100, 1 )
        infoGui.Background.Frame.Pity.Title.Text = `Exotic Pity ${pity}/100`
    }

    private resetPity ( egg: Egg ) {
        const infoGui = <typeof this.infoGui>this.folder.FindFirstChild( egg )?.FindFirstChild( "InfoGui" )
        if ( !infoGui ) return

        infoGui.Background.Frame.Pity.Bar.Size = UDim2.fromScale( 0, 1 )
        infoGui.Background.Frame.Pity.Title.Text = `Exotic Pity 0/100`
    }

    private autoDeletePet (egg: Egg, pet: Pet) {
        const folder = <typeof this.folder>this.folder.FindFirstChild( egg )
        const infoGui = folder.InfoGui
        const template = <PetTemplate> infoGui.Background.Frame.Container.FindFirstChild( pet )
        template.Delete.Visible = clientStore.getState().data.pet_auto_delete.get(egg)?.get(pet)!
    }

    private populatePets ( container: Frame, egg: Egg ) {
        const pets = EGG_SHOP_CONFIG[egg]
        for ( const [pet, props] of pairs( pets.pets ) ) {
            const petModel = <Model>ReplicatedStorage.Pets.FindFirstChild( pet )?.Clone()
            const template = <PetTemplate>container.FindFirstChild( "Template" )?.Clone()
            GenerateViewport( template.ViewportFrame, petModel, CFrame.Angles(0, math.rad(-90), 0) )
            template.Parent = container
            template.Visible = true
            template.Name = pet
            template.Chance.Text = `${props.chance}%`
            template.LayoutOrder = -props.chance
            template.ViewportFrame.BackgroundColor3 = RARITY_COLORS[props.rarity]

            template.Delete.Visible = clientStore.getState().data.pet_auto_delete.get(egg)?.get(pet)!
            template.MouseButton1Click.Connect(() => Events.autoDeletePet.fire(egg, pet))
        }
    }

    private generateEgg ( egg: Egg ) {
        const pity = clientStore.getState().data.pet_egg_pity.get( egg )!

        const folder = Make( "Folder", {
            Name: egg,
            Parent: this.folder
        } )
        const eggModel = <Workspace["Eggs"]["Starter"]>this.eggs.FindFirstChild(egg)
        const infoClone = this.infoGui.Clone()
        infoClone.Enabled = true
        infoClone.Parent = folder
        infoClone.Adornee = eggModel.Info
        infoClone.Background.Frame.Title.Text = `${egg.upper()} EGG`
        infoClone.Background.Frame.Pity.Title.Text = `Exotic Pity ${pity}/100`
        infoClone.Background.Frame.Pity.Bar.Size = UDim2.fromScale( pity / 100, 1 )
        this.populatePets( infoClone.Background.Frame.Container, egg )

        const interactClone = this.interact.Clone()
        interactClone.Enabled = true
        interactClone.Parent = folder
        interactClone.Adornee = eggModel.Interact

        interactClone.Auto.Triggered.Connect(( ) => this.autoHatch(egg))
        interactClone.Hatch.Triggered.Connect( ( ) => this.hatch(egg) )
        interactClone.Auto.Parent = eggModel
        interactClone.Hatch.Parent = eggModel

        interactClone.Container.Auto.MouseButton1Click.Connect(() => this.autoHatch(egg))
        interactClone.Container.Hatch.MouseButton1Click.Connect(() => this.hatch(egg))
    }

    private autoHatch ( egg: Egg ) {
        this.isAutoHatching = true
        while ( this.isAutoHatching ) {
            this.hatch(egg)
            task.wait(1)
        }
    }

    private hatch ( egg: Egg ) {
        const eggModel = <Workspace["Eggs"]["Starter"]>this.eggs.FindFirstChild(egg)

        const isTrippleHatch = clientStore.getState().data.gamepasses.get( "Tripple Hatch" ) && clientStore.getState().data.settings.get("Tripple Hatch")
        const amountOfHatches = isTrippleHatch ? 3 : 1

        const price = EGG_SHOP_CONFIG[egg].price * amountOfHatches
        const money = clientStore.getState().data.money
        const canAfford = money > price
        if ( !canAfford ) {
            this.notificationsController.createNotification("You don't have enough money!")
            this.isAutoHatching = false
            return
        }

        const storedPets = clientStore.getState().data.pet_inventory.size()
        let maxStorage = getMaxPetsStored(clientStore.getState().data)
        const hasStorage = storedPets + amountOfHatches <= maxStorage
        if ( !hasStorage ) {
            this.notificationsController.createNotification("Your Pet Storage is Full!")
            this.isAutoHatching = false
            return
        }

        const character = this.player.Character
        const humanoidRootPart = <BasePart>character?.FindFirstChild( "HumanoidRootPart" )
        if ( !character || !humanoidRootPart ) return

        const distanceBetween = ( humanoidRootPart.Position.sub( eggModel.Position ) ).Magnitude
        if ( distanceBetween >= MAX_DISTANCE_FROM_EGG ) return

        Functions.hatchEgg( egg ).andThen( ( pets ) => {
            if ( !pets ) return
            pets.forEach((pet) => this.hatchAnimation(egg, pet))
        })
    }

    private toggleGuis () {
        Lighting.Blur.Enabled = true
        const enabledGuis: ScreenGui[] = []
        this.playerGui.GetChildren().forEach( ( gui ) => {
            if ( !gui.IsA( "ScreenGui" ) ) return
            if ( gui.Enabled ) enabledGuis.push( gui )
            gui.Enabled = false
        } )

        const skipAnimation = clientStore.getState().data.settings.get("Skip Hatch Animation")

        task.delay( skipAnimation ? 1 : 3 , () => {
            enabledGuis.forEach( ( gui ) => gui.Enabled = true )
            Lighting.Blur.Enabled = false
        } )
    }

    private hatchAnimation ( egg: Egg, pet: Pet ) {
        this.toggleGuis()
        this.animation.Enabled = true

        const petModel = <Model>ReplicatedStorage.Pets.FindFirstChild(pet)?.Clone()
        const eggModel = <Model>ReplicatedStorage.Egg.FindFirstChild(egg)?.Clone()
        const template = this.animation.Frame.Template.Clone()
        template.Pet.Text = cleanString(pet)
        template.Parent = this.animation.Frame
        template.Visible = true

        const skipAnimation = clientStore.getState().data.settings.get("Skip Hatch Animation")
        if ( skipAnimation ) {
            CleanViewport( template )
            template.Pet.Visible = true
            GenerateViewport( template, petModel, CFrame.Angles( 0, math.rad( -90 ), 0 ) )
            template.Delete.Visible = clientStore.getState().data.pet_auto_delete.get(egg)?.get(pet)!
            task.wait(1)
            template.Destroy()
            return
        }

        GenerateViewport( template, eggModel )

        const tween = BoatTween.Create( eggModel.PrimaryPart!, {
            Time: .5,
            EasingStyle: "Cubic",
            EasingDirection: "InOut",
            Reverses: true,
            RepeatCount: 1,
            StepType: "Heartbeat",
            Goal: { Orientation: new Vector3(0, 0, 70) }
        } )

        tween.Play()

        tween.Completed.Connect( () => {
            CleanViewport( template )
            template.Pet.Visible = true
            GenerateViewport( template, petModel, CFrame.Angles( 0, math.rad( -90 ), 0 ) )
            template.Delete.Visible = clientStore.getState().data.pet_auto_delete.get(egg)?.get(pet)!
            task.wait(1)
            template.Destroy()
        } )
    }

}