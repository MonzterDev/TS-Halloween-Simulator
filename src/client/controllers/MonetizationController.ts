import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { FormatStandard } from "@rbxts/format-number";
import { MarketplaceService, Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { openGui } from "client/utils/openGui";
import { calculateCoinReward, DevProduct, DEV_PRODUCTS, DEV_PRODUCT_CONFIG, Gamepass, GAMEPASSES, GAMEPASS_CONFIG, getGamepassIDFromGamepass } from "shared/constants/Monetization";
import { BasketUpgradeController } from "./BasketUpgradeController";

type Mode = "Passes" | "Currency" | "Boosts"

@Controller({})
export class MonetizationController implements OnStart {
    private basketUpgradeController = Dependency(BasketUpgradeController)

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttonGui = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private openButton = this.buttonGui.Frame.MonetizationShop

    private monetizationGui = <StarterGui["Monetization"]>this.playerGui.WaitForChild( "Monetization" )
    private monetizationFrame = this.monetizationGui.Frame
    private monetizationMessage = this.monetizationFrame.Message

    private gui = <StarterGui["MonetizationShop"]>this.playerGui.WaitForChild( "MonetizationShop" )
    private frame = this.gui.Frame
    private buttons = this.frame.Buttons

    private gamepasses = this.frame.Gamepasses
    private boosts = this.frame.Boosts
    private currency = this.frame.Currency

    private exit = this.frame.Exit

    private mode: Mode = "Passes"

    onStart () {
        Events.purchaseSuccess.connect( ( product ) => this.notifyPlayer( product ) )
        this.openButton.MouseButton1Click.Connect( () => openGui( this.gui ) )
        this.exit.MouseButton1Click.Connect( () => this.gui.Enabled = false )
        this.buttons.Gamepasses.MouseButton1Click.Connect(() => this.switchMode( "Passes" ))
        this.buttons.Currency.MouseButton1Click.Connect(() => this.switchMode( "Currency" ))
        this.buttons.Boosts.MouseButton1Click.Connect(() => this.switchMode( "Boosts" ))

        this.generateGamepasses()
        this.generateBoosts()
        this.generateCurrency()

        this.basketUpgradeController.upgradePurchaseEvent.Connect(() => this.updateCurrency())
    }

    private switchMode(mode: Mode) {
        this.gamepasses.Visible = mode === "Passes"
        this.boosts.Visible = mode === "Boosts"
        this.currency.Visible = mode === "Currency"
    }

    private generateGamepasses () {
        for ( const [passId, passProps] of pairs( GAMEPASS_CONFIG ) ) {
            const template = this.gamepasses.Template.Clone()
            template.Name = passId
            template.Parent = this.gamepasses
            template.Visible = true
            template.LayoutOrder = GAMEPASSES.indexOf(passProps.displayName)

            const price = MarketplaceService.GetProductInfo( tonumber( passId )!, Enum.InfoType.GamePass ).PriceInRobux

            template.Icon.Image = passProps.imageId
            template.Price.Text = `R$: ${price}`
            template.Title.Text = passProps.displayName
            template.Description.Text = passProps.description
            template.MouseButton1Click.Connect(() => MarketplaceService.PromptGamePassPurchase( this.player, tonumber( passId )! ))
        }
    }

    private generateBoosts () {
        for ( const [productId, passProps] of pairs( DEV_PRODUCT_CONFIG ) ) {
            if ( passProps.type !== "Boost" ) continue

            const template = this.boosts.Template.Clone()
            template.Name = productId
            template.Parent = this.boosts
            template.Visible = true
            template.LayoutOrder = DEV_PRODUCTS.indexOf(passProps.displayName)

            const price = MarketplaceService.GetProductInfo( tonumber( productId )!, Enum.InfoType.Product ).PriceInRobux

            template.Icon.Image = passProps.imageId
            template.Price.Text = `R$: ${price}`
            template.Description.Text = `+150% ${passProps.displayName} for 20mins`
            template.MouseButton1Click.Connect(() => MarketplaceService.PromptProductPurchase( this.player, tonumber( productId )! ))
        }
    }

    private updateCurrency () {
        this.currency.GetChildren().forEach( ( child ) => {
            if ( !child.IsA( "TextButton" ) || !child.Visible ) return

            const template = <typeof this.currency.Template>child
            const coinPackage = template.GetAttribute( "coinPackage" )
            if ( !coinPackage ) return

            template.Amount.Text = FormatStandard(calculateCoinReward(<DevProduct> coinPackage, clientStore.getState().data))
        })
    }

    private generateCurrency () {
        for ( const [productId, passProps] of pairs( DEV_PRODUCT_CONFIG ) ) {
            if ( passProps.type !== "Currency" ) continue

            const template = this.currency.Template.Clone()
            template.Name = productId
            template.Parent = this.currency
            template.Visible = true
            template.SetAttribute( "coinPackage", passProps.displayName )
            template.LayoutOrder = DEV_PRODUCTS.indexOf(passProps.displayName)

            const price = MarketplaceService.GetProductInfo( tonumber( productId )!, Enum.InfoType.Product ).PriceInRobux

            template.Icon.Image = passProps.imageId
            template.Price.Text = `R$: ${price}`
            template.Amount.Text = FormatStandard(calculateCoinReward(passProps.displayName, clientStore.getState().data))
            template.MouseButton1Click.Connect(() => MarketplaceService.PromptProductPurchase( this.player, tonumber( productId )! ))
        }
    }

    private notifyPlayer ( product: Gamepass | DevProduct ) {
        const isGamepass = getGamepassIDFromGamepass( <Gamepass>product )

        this.monetizationMessage.Text = `You purchased ${product}, enjoy!`
        this.monetizationGui.Enabled = true
        task.delay(7, () => this.monetizationGui.Enabled = false)
    }

}