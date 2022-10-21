import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { BoatTween } from "@rbxts/boat-tween";
import { Clack, Prefer } from "@rbxts/clack";
import Make from "@rbxts/make";
import { Debris, Lighting, Players, ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { CleanViewport, GenerateViewport } from "@rbxts/viewport-model";
import { Events, Functions } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { EGG_SHOP_CONFIG, EGGS, PETS, Pet, Egg, getMaxPetsStored, RARITY_COLORS, getEggHatchChance, PET_CONFIG, Rarity } from "shared/constants/Pets";
import { cleanString } from "shared/util/functions/cleanString";
import { NotificationsController } from "./NotificationsController";

type PetTemplate = StarterGui["PetEgg"]["InfoGui"]["Frame"]["Container"]["Template"]

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

    private prefer = new Prefer()

    private connection = clientStore.changed.connect( ( newState ) => {
        this.updateHatchChance()
        this.connection.disconnect()
    })

    onStart () {
        this.eggs.GetChildren().forEach( ( child ) => this.generateEgg( <Egg>child.Name ) )
        Events.autoDeletePet.connect( ( egg, pet ) => task.defer( () => this.autoDeletePet( egg, pet ) ) )
        Events.resetEggPity.connect( ( egg ) => this.resetPity( egg ) )
        Events.increaseEggPity.connect( ( egg ) => task.defer( () => this.increaseEggPity( egg ) ) )
        Events.updateGamepass.connect( ( gamePass ) => {
            if ( gamePass === "Lucky Eggs" ) task.defer( () => this.updateHatchChance() )
        } )
        Events.useBoost.connect( ( boost ) => {
            if ( boost === "Luck" ) task.defer( () => this.updateHatchChance() )
        } )
        Events.endBoost.connect( ( boost ) => {
            if ( boost === "Luck" ) task.defer( () => this.updateHatchChance() )
        } )
        this.prefer.observePreferredInput( ( input ) => this.updateInteractButtons(input))
    }

    private updateInteractButtons ( input: Clack.InputType ) {
        this.folder.GetChildren().forEach( ( child ) => {
            if ( !child.IsA( "Folder" ) ) return

            const interactGui = <StarterGui["PetEgg"]["InteractGui"]>child.FindFirstChild( "InteractGui" )
            if ( !interactGui ) return

            const eggModel = Workspace.Eggs.FindFirstChild( child.Name )
            if ( !eggModel ) return

            const autoPrompt = <ProximityPrompt> eggModel.FindFirstChild("Auto")
            const hatchPrompt = <ProximityPrompt> eggModel.FindFirstChild("Hatch")

            interactGui.Frame.Hatch.Frame.KeyToPress.Text = input === Clack.InputType.MouseKeyboard ? hatchPrompt.KeyboardKeyCode.Name : hatchPrompt.GamepadKeyCode.Name.gsub("Button", "")[0]
            interactGui.Frame.Auto.Frame.KeyToPress.Text = input === Clack.InputType.MouseKeyboard ? autoPrompt.KeyboardKeyCode.Name : autoPrompt.GamepadKeyCode.Name.gsub("Button", "")[0]
            interactGui.Frame.Hatch.Frame.KeyToPress.Visible = input === Clack.InputType.MouseKeyboard || input === Clack.InputType.Gamepad
            interactGui.Frame.Auto.Frame.KeyToPress.Visible = input === Clack.InputType.MouseKeyboard || input === Clack.InputType.Gamepad
            interactGui.Frame.Hatch.Frame.KeyToPressMobile.Visible = input === Clack.InputType.Touch
            interactGui.Frame.Auto.Frame.KeyToPressMobile.Visible = input === Clack.InputType.Touch
        })
    }

    private updateHatchChance () {
        this.folder.GetChildren().forEach( ( child ) => {
            if ( !child.IsA( "Folder" ) ) return

            const infoGui = <typeof this.infoGui>child.FindFirstChild( "InfoGui" )
            if ( !infoGui ) return

            const container = infoGui.Frame.Container
            container.GetChildren().forEach( ( child ) => {
                if ( !child.IsA( "ImageButton" ) || !child.Visible ) return

                let chance = <number>child.GetAttribute( "chance" )
                chance = getEggHatchChance( chance, clientStore.getState().data )

                const chanceLabel = child.FindFirstChild( "Chance" ) as TextLabel
                chanceLabel.Text = `${chance}%`
            })
        })
    }

    private increaseEggPity ( egg: Egg ) {
        const infoGui = <typeof this.infoGui>this.folder.FindFirstChild( egg )?.FindFirstChild( "InfoGui" )
        if ( !infoGui ) return

        const pity = clientStore.getState().data.pet_egg_pity.get( egg )!

        infoGui.ProgressBar.Box.CompletedProgressBar.Size = UDim2.fromScale( pity / 100, 1 )
        infoGui.Progress.Text = `Pity ${pity}/100`
    }

    private resetPity ( egg: Egg ) {
        const infoGui = <typeof this.infoGui>this.folder.FindFirstChild( egg )?.FindFirstChild( "InfoGui" )
        if ( !infoGui ) return

        infoGui.ProgressBar.Box.CompletedProgressBar.Size = UDim2.fromScale( 0, 1 )
        infoGui.Progress.Text = `Pity 0/100`
    }

    private autoDeletePet (egg: Egg, pet: Pet) {
        const folder = <typeof this.folder>this.folder.FindFirstChild( egg )
        const infoGui = folder.InfoGui
        const template = <PetTemplate>infoGui.Frame.Container.FindFirstChild( pet )
        if (!template) return

        const autoDeleteEnabled = clientStore.getState().data.pet_auto_delete.get( egg )?.get( pet )!
        template.Delete.Visible = autoDeleteEnabled
        template.UIStroke.Enabled = autoDeleteEnabled
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
            template.Chance.Text = `${getEggHatchChance( props.chance, clientStore.getState().data )}%`
            template.LayoutOrder = -props.chance
            template.ViewportFrame.BackgroundColor3 = RARITY_COLORS[props.rarity]
            template.SetAttribute("chance", props.chance)

            const autoDeleteEnabled = clientStore.getState().data.pet_auto_delete.get( egg )?.get( pet )!
            template.Delete.Visible = autoDeleteEnabled
            template.UIStroke.Enabled = autoDeleteEnabled

            template.MouseButton1Click.Connect(() => Events.autoDeletePet.fire(egg, pet))
        }
    }

    private generateEgg ( egg: Egg ) {
        const pity = clientStore.getState().data.pet_egg_pity.get( egg )!

        const folder = Make( "Folder", {
            Name: egg,
            Parent: this.folder
        } )

        const eggModel = <Workspace["Eggs"]["Spawn"]>this.eggs.FindFirstChild(egg)
        const infoClone = this.infoGui.Clone()
        infoClone.Enabled = true
        infoClone.Parent = folder
        infoClone.Adornee = eggModel.Info
        infoClone.Title.Title.Text = `${egg} Egg`
        infoClone.Progress.Text = `Pity ${pity}/100`
        infoClone.ProgressBar.Box.CompletedProgressBar.Size = UDim2.fromScale( pity / 100, 1 )
        this.populatePets( infoClone.Frame.Container, egg )

        const interactClone = this.interact.Clone()
        interactClone.Enabled = true
        interactClone.Parent = folder
        interactClone.Adornee = eggModel.Interact

        interactClone.Auto.Triggered.Connect(( ) => this.autoHatch(egg))
        interactClone.Hatch.Triggered.Connect( ( ) => this.hatch(egg) )
        interactClone.Auto.Parent = eggModel
        interactClone.Hatch.Parent = eggModel

        interactClone.Frame.Auto.MouseButton1Click.Connect(() => this.autoHatch(egg))
        interactClone.Frame.Hatch.MouseButton1Click.Connect(() => this.hatch(egg))
    }

    private autoHatch ( egg: Egg ) {
        const position = this.player.Character?.PrimaryPart?.Position
        if ( !position ) return

        this.isAutoHatching = true
        while ( this.isAutoHatching ) {
            this.hatch(egg)
            if ( this.player.Character?.PrimaryPart?.Position !== position ) {
                this.notificationsController.createNotification( "You moved, auto hatching stopped!" )
                this.isAutoHatching = false
            }
            task.wait(1)
        }
    }

    private hatch ( egg: Egg ) {
        const eggModel = <Workspace["Eggs"]["Spawn"]>this.eggs.FindFirstChild(egg)

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
        if ( !character || !humanoidRootPart ) {
            this.isAutoHatching = false
            return
        }

        const distanceBetween = ( humanoidRootPart.Position.sub( eggModel.Position ) ).Magnitude
        if ( distanceBetween >= MAX_DISTANCE_FROM_EGG ) {
            this.isAutoHatching = false
            return
        }

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

        this.folder.GetDescendants().forEach( ( child ) => {
            if (child.IsA("BillboardGui")) child.Enabled = false
        })

        const skipAnimation = clientStore.getState().data.settings.get("Skip Hatch Animation")

        task.delay( skipAnimation ? 1 : 3 , () => {
            enabledGuis.forEach( ( gui ) => gui.Enabled = true )
            Lighting.Blur.Enabled = false
            this.folder.GetDescendants().forEach( ( child ) => {
                if (child.IsA("BillboardGui")) child.Enabled = true
            })
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

        eggModel.PrimaryPart!.Orientation = new Vector3( 0, 0, -70 )
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