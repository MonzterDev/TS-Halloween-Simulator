import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { BoatTween } from "@rbxts/boat-tween";
import { Events, Functions } from "client/network";
import { Currency } from "shared/constants/Currencies";
import { isA } from "shared/util/functions/isA";
import { abbreviator, noDecimalPlaceAbbreviator } from "shared/util/functions/abbreviate";

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

    private popup = this.gui.Popup
    private popupTemplate = this.popup.Template

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
        Events.updateCurrency.connect( ( currency, amount ) => this.updateAmount( currency, amount ) )
        Events.luckyReward.connect((amount) => this.animateAmount(true))
    }

    private updateAmount ( currency: Currency, amount: number ) {
        const displayAmount = <string>abbreviator.abbreviate(amount)
        if ( currency === "candy" ) {
            this.candyAmount.Text = `${noDecimalPlaceAbbreviator.abbreviate(amount)}/${this.storage}`
            if (amount > 0) this.animateAmount()
        }
        if (currency === "candy_corn") this.candyCornAmount.Text = displayAmount
        if (currency === "money") this.moneyAmount.Text = displayAmount
    }

    private animateAmount (bonus?: boolean) {
        const clone = this.popupTemplate.Clone()
        clone.Parent = this.popup
        clone.Visible = true

        if (bonus) clone.BackgroundColor3 = Color3.fromRGB(92,245,255)

        clone.Position = UDim2.fromScale( math.random( 1, 100 ) / 100, math.random( 1, 100 ) / 100 )

        const tween = BoatTween.Create( clone, {
            Time: 2,
            EasingStyle: "EntranceExpressive",
            EasingDirection: "Out",
            StepType: "Stepped",
            Goal: {
                Position: UDim2.fromScale( -0.3, 0.375 ),
                Rotation: 360,
                Transparency: 1
            }
        } )
        tween.Completed.Connect( () => clone.Destroy() )
        tween.Play()

    }

}