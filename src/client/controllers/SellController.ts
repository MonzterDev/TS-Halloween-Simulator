import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "client/network";

@Controller({})
export class SellController implements OnInit {
    private sellFolder = Workspace.Sell

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttons = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private button = this.buttons.Frame.Sell

    private ownsSellGamepass = false

    onInit() {
        this.button.MouseButton1Click.Connect(() => this.clickSellButton())
    }

    private getClosestSellPart (): BasePart | false {
        const character = this.player.Character
        if ( !character ) return false
        const humanoidRootPart = <BasePart>character.FindFirstChild("HumanoidRootPart")

        let closestPart
        let closestDistance = 999
        this.sellFolder.GetChildren().forEach( ( part ) => {
            if ( !part.IsA( "BasePart" ) ) return
            const distance = ( humanoidRootPart.Position.sub( part.Position ) ).Magnitude
            if ( distance < closestDistance ) {
                closestDistance = distance
                closestPart = part
            }
        } )

        return closestPart || false
    }

    public clickSellButton () {
        if ( this.ownsSellGamepass ) Events.sell()
        else {
            const closestPart = this.getClosestSellPart()
            const character = this.player.Character
            if ( !character || !closestPart ) return
            character.PivotTo(closestPart.CFrame)
        }
    }

}