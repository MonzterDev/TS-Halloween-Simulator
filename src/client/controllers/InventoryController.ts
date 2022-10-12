import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { openGui } from "client/utils/openGui";

type Mode = "Pets" | "Boosts"

@Controller({})
export class InventoryController implements OnInit {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private petInventoryGui = <StarterGui["PetInventory"]>this.playerGui.WaitForChild( "PetInventory" )
    private boostInventoryGui = <StarterGui["BoostInventory"]>this.playerGui.WaitForChild( "BoostInventory" )

    private buttons = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private gui = <StarterGui["Inventory"]>this.playerGui.WaitForChild( "Inventory" )

    private title = this.gui.Frame.Title

    private petsButton = this.gui.Frame.Buttons.Pets
    private boostsButton = this.gui.Frame.Buttons.Boosts
    private openButton = this.buttons.Frame.Inventory
    private exitButton = this.gui.Frame.Exit

    private mode: Mode = "Pets"

    onInit () {
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
        if (this.mode === "Pets") this.petInventoryGui.Enabled = open
        else if (this.mode === "Boosts") this.boostInventoryGui.Enabled = open
    }

    private changeMode ( mode: Mode ) {
        if (this.mode === mode) return
        this.mode = mode
        this.title.Text = mode.upper()
        this.petInventoryGui.Enabled = mode === "Pets"
        this.boostInventoryGui.Enabled = mode === "Boosts"
        this.boostInventoryGui.Frame.Info.Visible = false
        this.petInventoryGui.Frame.Info.Visible = false
    }
}