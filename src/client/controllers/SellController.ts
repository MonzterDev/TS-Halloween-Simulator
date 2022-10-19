import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { GuiService, Players, Workspace } from "@rbxts/services";
import { Events } from "client/network";
import { AreaController } from "./AreaController";

@Controller({})
export class SellController implements OnStart {
    private areaController = Dependency(AreaController)

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttons = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private button = this.buttons.Frame.Sell

    private ownsSellGamepass = false

    onStart() {
        this.button.MouseButton1Click.Connect(() => this.clickSellButton())
    }

    public clickSellButton () {
        GuiService.SelectedObject = undefined
        if ( this.ownsSellGamepass ) Events.sell()
        else {
            const sellPart = this.areaController.getPart("Sell")
            const character = this.player.Character
            if ( !character || !sellPart ) return
            character.PivotTo(sellPart.CFrame)
        }
    }

}