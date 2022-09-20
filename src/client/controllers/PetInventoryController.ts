import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";

@Controller({})
export class PetInventoryController implements OnInit {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private test = this.playerGui.WaitForChild( "Currency" )

    private gui = this.playerGui.Currency
    private frame = this.gui.Frame
    private candyAmount = this.frame.CandyHolder.Amount
    private candyCornAmount = this.frame.CandyCornHolder.Amount
    private moneyAmount = this.frame.MoneyHolder.Amount

    onInit() {

    }
}