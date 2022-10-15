import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { BoatTween } from "@rbxts/boat-tween";
import { Events, Functions } from "client/network";
import { Currency } from "shared/constants/Currencies";
import { SellController } from "./SellController";
import { BasketUpgradeController } from "./BasketUpgradeController";
import { clientStore } from "client/rodux/rodux";
import { BASKET_UPGRADE_CONFIG } from "shared/constants/Basket";
import { FormatCompact, FormatStandard } from "@rbxts/format-number";

@Controller({})
export class CurrencyController implements OnStart {
    private sellController = Dependency(SellController)
    private basketUpgradeController = Dependency( BasketUpgradeController )

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private gui = <StarterGui["Currency"]> this.playerGui.WaitForChild("Currency")
    private frame = this.gui.Frame
    private candyAmount = this.frame.CandyHolder.Amount
    private candyCornAmount = this.frame.CandyCornHolder.Amount
    private moneyAmount = this.frame.MoneyHolder.Amount

    private popup = this.gui.Popup
    private popupTemplate = this.popup.Template

    private full = this.gui.Full
    private upgradeButton = this.full.Upgrade
    private sellButton = this.full.Sell

    onStart () {
        this.updateAmount("candy", clientStore.getState().data.candy)
        this.updateAmount("money", clientStore.getState().data.money)
        this.updateAmount( "candy_corn", clientStore.getState().data.candy_corn )
        Events.updateCurrency.connect( ( currency, amount ) => this.updateAmount( currency, amount ) )
        Events.luckyReward.connect( ( amount ) => this.animateAmount( true ) )
        this.sellButton.MouseButton1Click.Connect(() => this.clickFullButtons("Sell"))
        this.upgradeButton.MouseButton1Click.Connect(() => this.clickFullButtons("Upgrade"))
    }

    private updateAmount ( currency: Currency, amount: number ) {
        const displayAmount = FormatStandard( amount )
        if ( currency === "candy" ) {
            const storage = BASKET_UPGRADE_CONFIG.Size[clientStore.getState().data.basket_upgrades.Size]
            this.candyAmount.Text = `${FormatStandard(amount)}/${storage}`
            if ( amount > 0 ) this.animateAmount()
            if (amount >= storage) this.fullNotification()
        }
        if (currency === "candy_corn") this.candyCornAmount.Text = displayAmount
        if (currency === "money") this.moneyAmount.Text = displayAmount
    }

    private fullNotification () {
        this.full.Visible = true
        task.delay(5, () => this.full.Visible = false)
    }

    private clickFullButtons (button: "Sell" | "Upgrade") {
        this.full.Visible = false
        if (button === "Sell") this.sellController.clickSellButton()
        if (button === "Upgrade") this.basketUpgradeController.teleportToShop()
    }

    private animateAmount ( bonus?: boolean ) {
        if (clientStore.getState().data.settings.get("Hide Currency Popup")) return
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