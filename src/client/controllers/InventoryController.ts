import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { openGui, resetScrollingFrame } from "client/utils/openGui";

type Mode = "Pets" | "Boosts"

@Controller({})
export class InventoryController implements OnStart {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttons = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private gui = <StarterGui["Inventory"]>this.playerGui.WaitForChild( "Inventory" )

    private petInventory = this.gui.Frame.PetInventory
    private boostInventory = this.gui.Frame.BoostInventory

    private title = this.gui.Frame.Title

    private petsButton = this.gui.Frame.Buttons.Pets
    private boostsButton = this.gui.Frame.Buttons.Boosts
    private openButton = this.buttons.Frame.Inventory
    private exitButton = this.gui.Frame.Exit

    private mode: Mode = "Pets"

    onStart () {
        this.openButton.MouseButton1Click.Connect( () => {
            openGui(this.gui)
            this.displayGui( this.gui.Enabled )
        } )
        this.exitButton.MouseButton1Click.Connect( () => this.displayGui( false ) )
        this.petsButton.MouseButton1Click.Connect(() => this.changeMode("Pets"))
        this.boostsButton.MouseButton1Click.Connect(() => this.changeMode("Boosts"))
    }

    private displayGui ( open: boolean ) {
        this.gui.Enabled = open
        if (this.mode === "Pets") this.petInventory.Visible = open
        else if ( this.mode === "Boosts" ) this.boostInventory.Visible = open
        this.boostInventory.Info.Visible = false
        this.petInventory.Info.Visible = false
    }

    private changeMode ( mode: Mode ) {
        if (this.mode === mode) return
        this.mode = mode
        this.title.Title.Text = mode
        this.petInventory.Visible = mode === "Pets"
        this.boostInventory.Visible = mode === "Boosts"
        this.petsButton.ZIndex = mode === "Pets" ? 1 : 0
        this.boostsButton.ZIndex = mode === "Boosts" ? 1 : 0
        this.boostInventory.Info.Visible = false
        this.petInventory.Info.Visible = false
        resetScrollingFrame(this.petInventory.Container)
        resetScrollingFrame(this.boostInventory.Container)
    }
}