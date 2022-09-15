import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events, Functions } from "client/network";
import { Currency } from "shared/constants/Currencies";
import { isA } from "shared/util/functions/isA";

@Controller({})
export class CurrencyController implements OnInit {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private test = this.playerGui.WaitForChild( "Currency" )

    private gui = this.playerGui.Currency
    private frame = this.gui.Frame
    private candyAmount = this.frame.CandyHolder.Amount
    private candyCornAmount = this.frame.CandyCornHolder.Amount
    private moneyAmount = this.frame.MoneyHolder.Amount

    private storage = 10

    onInit () {
        Functions.getData.invoke( "candy" ).andThen( ( amount ) => {
            if (isA<number>(amount)) this.updateAmount( "candy",  amount )
        } )
        Functions.getData.invoke( "candy_corn" ).andThen( ( amount ) => {
            if (isA<number>(amount)) this.updateAmount( "candy_corn",  amount )
        } )
        Functions.getData.invoke( "money" ).andThen( ( amount ) => {
            if (isA<number>(amount)) this.updateAmount( "money",  amount )
        } )
        Events.updateCurrency.connect((currency, amount) => this.updateAmount(currency, amount))
    }

    private updateAmount ( currency: Currency, amount: number ) {
        if (currency === "candy") this.candyAmount.Text = `${amount}/${this.storage}`
        if (currency === "candy_corn") this.candyCornAmount.Text = tostring(amount)
        if (currency === "money") this.moneyAmount.Text = tostring(amount)
    }

}