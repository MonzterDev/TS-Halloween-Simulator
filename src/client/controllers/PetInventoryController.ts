import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { PetConfig, PetInstanceProps, UUID } from "shared/constants/Pets";
import { CleanViewport, GenerateViewport } from "shared/util/functions/Viewports";

type Mode = "Default" | "Trash"
type Template = ImageButton & {
	ViewportFrame: ViewportFrame;
	Locked: ImageLabel;
	IsSelected: ImageLabel;
    Equipped: ImageLabel;
    Power: TextLabel;
};

@Controller({})
export class PetInventoryController implements OnInit {
    private petsFolder = ReplicatedStorage.Pets
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private test = this.playerGui.WaitForChild( "Currency" )

    private openButton = this.playerGui.Buttons.Frame.Pet

    private gui = this.playerGui.PetInventory
    private frame = this.gui.Frame
    private buttons = this.frame.Buttons
    private confirmation = this.frame.Confirmation
    private container = this.frame.Container
    private info = this.frame.Info

    private template = this.container.Template

    private equipBest = this.buttons.EquipBest
    private trashMode = this.buttons.Trash
    private exit = this.frame.Exit

    private mode: Mode = "Default"
    private selectedPet: UUID | undefined
    private selectedPets: UUID[] = []

    onInit () {
        Events.givePet.connect( ( uuid, props ) => this.generatePet( uuid, props ) )
        Events.deletePet.connect((uuid) => this.container.FindFirstChild(uuid)?.Destroy())
        this.exit.MouseButton1Click.Connect( () => this.gui.Enabled = false )
        this.openButton.MouseButton1Click.Connect( () => this.gui.Enabled = true )
        this.trashMode.MouseButton1Click.Connect( () => this.changeMode( "Trash" ) )
        this.confirmation.Confirm.MouseButton1Click.Connect( () => {
            Events.deletePets.fire(this.selectedPets)
            this.changeMode("Default")
        } )
        this.info.Buttons.Equip.MouseButton1Click.Connect(() => Events.equipPet.fire(this.selectedPet!))
    }

    private generatePet (uuid: UUID, props: PetInstanceProps) {
        const clone = this.template.Clone()
        clone.Parent = this.container
        clone.Visible = true
        clone.Name = uuid

        const power = PetConfig[props.type][props.rarity]
        clone.Power.Text = tostring( power )
        clone.Equipped.Visible = props.equipped ? props.equipped : false
        clone.Locked.Visible = props.locked ? props.locked : false

        const pet = <Model>this.petsFolder.FindFirstChild(props.type)?.Clone()
        GenerateViewport( clone.ViewportFrame, pet )

        clone.MouseButton1Click.Connect(() => this.clickPet(uuid))
    }

    private changeMode ( mode: Mode ) {
        this.mode = mode
        switch ( this.mode ) {
            case "Default":
                this.buttons.Visible = true
                this.confirmation.Visible = false
                break
            case "Trash":
                this.info.Visible = false
                this.buttons.Visible = false
                this.confirmation.Visible = true
                break
        }
        this.container.GetChildren().forEach( ( child ) => {
            if ( child.IsA( "ImageButton" ) && child.Visible ) {
                const label = <ImageLabel>child.FindFirstChild( "IsSelected" )
                label.Visible = false
            }
        } )
        this.selectedPets = []
    }

    private clickPet ( uuid: UUID ) {
        this.selectedPet = uuid
        switch ( this.mode ) {
            case "Default":
                this.displayInfo(uuid)
                break
            case "Trash":
                const template = <Template>this.container.FindFirstChild( uuid )
                template.IsSelected.Visible = !template.IsSelected.Visible
                if ( template.IsSelected.Visible ) this.selectedPets.push( uuid )
                else this.selectedPets.remove(this.selectedPets.indexOf(uuid))
                break
        }
    }

    private getPetPropsFromUUID ( uuid: UUID ) {
        return clientStore.getState().data.pet_inventory.get(uuid)
    }

    private displayInfo (uuid: UUID) {
        const props = this.getPetPropsFromUUID( uuid )
        if ( !props ) return

        this.info.PetName.Text = props.type
        const power = PetConfig[props.type][props.rarity]
        this.info.Power.Text = tostring( power )
        this.info.Equipped.Visible = props.equipped ? props.equipped : false
        this.info.Locked.Visible = props.locked ? props.locked : false

        const pet = <Model>this.petsFolder.FindFirstChild( props.type )?.Clone()
        CleanViewport(this.info.ViewportFrame)
        GenerateViewport( this.info.ViewportFrame, pet )
        this.info.Visible = true
    }
}