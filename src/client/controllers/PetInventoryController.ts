import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { PetConfig, PetInstanceProps, UUID } from "shared/constants/Pets";
import { CleanViewport, GenerateViewport } from "shared/util/functions/Viewports";
import { PetsController } from "./PetsController";

type Mode = "Default" | "Trash"
type Template = ImageButton & {
	ViewportFrame: ViewportFrame;
	Locked: ImageLabel;
	IsSelected: ImageLabel;
    Equipped: ImageLabel;
    Power: TextLabel;
};
type Warning = "Too Many Pets"

@Controller({})
export class PetInventoryController implements OnInit {
    private petsController = Dependency(PetsController)
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
    private warning = this.frame.Warning
    private stored = this.frame.Stored
    private equipped = this.frame.Equipped

    private template = this.container.Template

    private equipBest = this.buttons.EquipBest
    private trashMode = this.buttons.Trash
    private exit = this.frame.Exit

    private mode: Mode = "Default"
    private selectedPet: UUID | undefined
    private selectedPets: UUID[] = []

    onInit () {
        Events.updateGamepass.connect( ( gamepass ) => this.updateLabels() )
        Events.equipPet.connect((player, uuid, pet) => this.equipPet(player, uuid, true))
        Events.unequipPet.connect((player, uuid) => this.equipPet(player, uuid, false))
        Events.lockPet.connect((uuid) => this.lockPet(uuid, true))
        Events.unlockPet.connect((uuid) => this.lockPet(uuid, false))
        Events.givePet.connect( ( uuid, props ) => this.generatePet( uuid, props ) )
        Events.deletePet.connect( ( uuid ) => {
            this.container.FindFirstChild( uuid )?.Destroy()
            this.updateLabels()
        } )
        this.exit.MouseButton1Click.Connect( () => this.gui.Enabled = false )
        this.openButton.MouseButton1Click.Connect( () => this.gui.Enabled = true )
        this.trashMode.MouseButton1Click.Connect( () => this.changeMode( "Trash" ) )
        this.confirmation.Confirm.MouseButton1Click.Connect( () => {
            Events.deletePets.fire(this.selectedPets)
            this.changeMode( "Default" )
        } )
        this.confirmation.Cancel.MouseButton1Click.Connect( () => this.changeMode( "Default" ) )
        this.buttons.EquipBest.MouseButton1Click.Connect(() => Events.equipBestPets.fire())
        this.info.Buttons.Equip.MouseButton1Click.Connect(() => this.equipButton())
        this.info.Buttons.Lock.MouseButton1Click.Connect(() => this.lockButton())
        this.info.Buttons.Delete.MouseButton1Click.Connect( () => {
            Events.deletePet.fire( this.selectedPet! )
            this.info.Visible = false
            this.selectedPet = undefined
        } )
    }

    private updateLabels () {
        task.wait(.1)
        const maxStored = this.petsController.getMaxPetStorage()
        const currentStored = clientStore.getState().data.pet_inventory.size()
        const maxEquipped = this.petsController.getMaxPetEquipped()
        const currentEquipped = this.petsController.getEquippedPets().size()
        this.stored.Text = `${currentStored}/${maxStored} Stored`
        this.equipped.Text = `${currentEquipped}/${maxEquipped} Equipped`
    }

    private equipPet ( player: Player, uuid: UUID, equip: boolean ) {
        if (player !== this.player) return
        const template = <Template>this.container.FindFirstChild( uuid )
        if ( !template ) return
        template.Equipped.Visible = equip
        const props = this.getPetPropsFromUUID( uuid )
        const power = PetConfig[props!.type][props!.rarity]
        template.LayoutOrder = equip ? -1_000_000 - power : -power
        this.updateLabels()
    }

    private lockPet (uuid: UUID, lock: boolean ) {
        const template = <Template>this.container.FindFirstChild( uuid )
        if ( !template ) return
        template.Locked.Visible = lock
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
        clone.LayoutOrder = props.equipped ? -1_000_000 - power : -power

        const pet = <Model>this.petsFolder.FindFirstChild(props.type)?.Clone()
        GenerateViewport( clone.ViewportFrame, pet )

        clone.MouseButton1Click.Connect( () => this.clickPet( uuid ) )
        this.updateLabels()
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
        this.selectedPets.clear()
    }

    private clickPet ( uuid: UUID ) {
        this.selectedPet = uuid
        switch ( this.mode ) {
            case "Default":
                this.displayInfo(uuid)
                break
            case "Trash":
                const props = this.getPetPropsFromUUID( uuid )
                if (props?.locked) return
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

        this.info.Buttons.Equip.Text = !props.equipped ? "Equip" : "Unequip"
        this.info.Buttons.Equip.BackgroundColor3 = !props.equipped ? Color3.fromRGB(69,255,46) : Color3.fromRGB(64,232,41)
        this.info.Buttons.Lock.Text = !props.locked ? "Lock" : "Unlock"
        this.info.Buttons.Lock.BackgroundColor3 = !props.locked ? Color3.fromRGB(242,255,46) : Color3.fromRGB(201,212,64)
        this.info.Buttons.Delete.Visible = !props.locked
    }

    private warn ( message: Warning ) {
        let text = ""
        if ( message === "Too Many Pets" ) text = "You cannot equip more pets!"
        this.warning.Text = text
        this.warning.Visible = true
        task.delay(3, () => this.warning.Visible = false)
    }

    private equipButton () {
        const equipped = this.getPetPropsFromUUID( this.selectedPet! )?.equipped
        if ( !equipped && this.petsController.getEquippedPets().size() === this.petsController.getMaxPetEquipped() ) {
            this.warn("Too Many Pets")
            return
        }
        if (equipped) Events.unequipPet.fire(this.selectedPet!)
        else Events.equipPet.fire( this.selectedPet! )
        this.info.Buttons.Equip.Text = equipped ? "Equip" : "Unequip"
        this.info.Buttons.Equip.BackgroundColor3 = equipped ? Color3.fromRGB( 69, 255, 46 ) : Color3.fromRGB( 64, 232, 41 )
        this.info.Equipped.Visible = !equipped
    }

    private lockButton () {
        const locked = this.getPetPropsFromUUID( this.selectedPet! )?.locked
        if (locked) Events.unlockPet.fire(this.selectedPet!)
        else Events.lockPet.fire( this.selectedPet! )
        this.info.Buttons.Lock.Text = locked ? "Lock" : "Unlock"
        this.info.Buttons.Lock.BackgroundColor3 = locked ? Color3.fromRGB(242,255,46) : Color3.fromRGB(201,212,64)
        this.info.Locked.Visible = !locked
        this.info.Buttons.Delete.Visible = locked!
    }
}