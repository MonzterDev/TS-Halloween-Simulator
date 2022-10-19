import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players, ReplicatedStorage, ServerStorage } from "@rbxts/services";
import { CleanViewport, GenerateViewport } from "@rbxts/viewport-model";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { openGui } from "client/utils/openGui";
import { EggPetProps, EGG_SHOP_CONFIG, EGGS, PETS, RARITY_COLORS, Egg, Pet } from "shared/constants/Pets";

@Controller({})
export class PetIndexController implements OnStart {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttons = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private gui = <StarterGui["PetIndex"]>this.playerGui.WaitForChild( "PetIndex" )


    private frame = this.gui.Frame
    private container = this.frame.Container
    private template = this.container.Template

    private openButton = this.buttons.Frame.PetIndex
    private exitButton = this.frame.Exit

    onStart() {
        this.openButton.MouseButton1Click.Connect( () => openGui( this.gui ) )
        this.exitButton.MouseButton1Click.Connect( () => this.gui.Enabled = false )
        Events.addToPetIndex.connect((egg, pet) => this.updatePetIndex(egg, pet) )
        this.generateEggs()
    }

    private updatePetIndex ( egg: Egg, pet: Pet ) {
        const eggTemplate = this.container.FindFirstChild( egg )
        const petTemplate = <typeof this.template.Container.Template>eggTemplate?.FindFirstChild( "Container" )?.FindFirstChild( pet )
        CleanViewport( petTemplate.ViewportFrame )

        const petModel = <Model>ReplicatedStorage.Pets.FindFirstChild( pet )?.Clone()
        GenerateViewport( petTemplate.ViewportFrame, petModel, CFrame.Angles( 0, math.rad( -90 ), 0 ) )

        petTemplate.ViewportFrame.Locked.Visible = false
    }

    private generatePets ( container: typeof this.template.Container, pets: EggPetProps ) {
        for ( const [petName, petConfig] of pairs( pets ) ) {
            const clone = container.Template.Clone()
            clone.Parent = container
            clone.Name = petName
            clone.Visible = true
            clone.ViewportFrame.BackgroundColor3 = RARITY_COLORS[petConfig.rarity]
            clone.ViewportFrame.Title.Text = petName
            clone.LayoutOrder = -petConfig.chance

            const isUnlocked = clientStore.getState().data.pet_index.get(container.Parent?.Name as Egg)?.get(petName)!

            const petModel = <Model>ReplicatedStorage.Pets.FindFirstChild( petName )?.Clone()

            if ( !isUnlocked ) {
                petModel.GetDescendants().forEach( ( descendant ) => {
                    if ( descendant.IsA( "BasePart" ) ) descendant.BrickColor = new BrickColor( "Really black" )
                    else if ( descendant.IsA( "Decal" ) ) descendant.Transparency = 1
                } )
                clone.ViewportFrame.Locked.Visible = true
            }

            GenerateViewport(clone.ViewportFrame, petModel, CFrame.Angles(0, math.rad(-90), 0))
        }
    }

    private generateEggs () {
        for (const [eggName, eggConfig] of pairs(EGG_SHOP_CONFIG)) {
            const clone = this.template.Clone()
            clone.Parent = this.container
            clone.Visible = true
            clone.Name = eggName

            const eggModel = <Model>ReplicatedStorage.Egg.FindFirstChild( eggName )?.Clone()
            GenerateViewport( clone.Egg, eggModel )
            clone.Egg.Amount.Text = "1/3" // TODO
            this.generatePets(clone.Container, eggConfig.pets)
        }
    }
}