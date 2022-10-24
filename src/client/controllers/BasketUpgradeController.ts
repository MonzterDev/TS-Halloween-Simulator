import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { GuiService, Players, Workspace } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { Events, Functions } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { closeGui, openGui, setSelectedObject } from "client/utils/openGui";
import { Area } from "shared/constants/Areas";
import { BASKET_UPGRADES, getBasketUpgradePrice, BASKET_UPGRADE_DESCRIPTION, BasketUpgrade } from "shared/constants/Basket";
import { abbreviator } from "shared/util/functions/abbreviate";
import { AreaController } from "./AreaController";
import { NotificationsController } from "./NotificationsController";

const areasMaxLevel: Record<Area, number> = {
    "Spawn": 10,
    "Camp": 20
}

@Controller({})
export class BasketUpgradeController implements OnStart {
    private notificationsController = Dependency(NotificationsController)
    private areaController = Dependency(AreaController)

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private gui = <StarterGui["BasketUpgrade"]>this.playerGui.WaitForChild("BasketUpgrade")
    private frame = this.gui.Frame
    private upgrades = this.frame.Upgrades
    private info = this.frame.Info
    private purchase = this.info.Buy
    private exit = this.frame.Exit

    private template = this.upgrades.Template

    private area: Area = "Spawn"
    private selectedUpgrade: BasketUpgrade = "Range"

    public upgradePurchaseEvent = new Signal<() => void>()

    private isOnCooldown = false

    onStart () {
        this.generateShopParts()
        this.purchase.MouseButton1Click.Connect( () => this.requestUpgrade() )
        this.exit.MouseButton1Click.Connect( () => {
            closeGui(this.gui)
            this.info.Visible = false
        } )
        Events.displayBasketUpgradeShop.connect( ( area ) => this.display( area ) )
    }

    public teleportToShop () {
        const closestPart = this.areaController.getPart("Shop")
        const character = this.player.Character
        if ( !character || !closestPart ) return
        character.PivotTo(closestPart.CFrame)
    }

    private generateShopParts () {
        Workspace.Areas.GetChildren().forEach( ( areaFolder ) => {
            const shopPart = <Part>areaFolder.FindFirstChild( "Shop" )
            if (!shopPart) return

            shopPart.Touched.Connect( ( otherPart ) => {
                if ( !otherPart.IsA( "BasePart" ) ) return

                const player = Players.GetPlayerFromCharacter( otherPart.Parent )
                if (player && player === this.player) this.display(areaFolder.Name)
            })
        })
    }

    private display ( area: Area ) {
        if (this.isOnCooldown) return
        this.isOnCooldown = true
        task.delay( 2, () => this.isOnCooldown = false )

        openGui( this.gui )
        setSelectedObject(this.upgrades)
        this.area = area
        this.gui.Enabled = true
        this.cleanup()
        this.generateUpgrades()
    }

    private cleanup () {
        this.upgrades.GetChildren().forEach( ( child ) => {
            if (child.IsA("ImageButton") && child.Visible) child.Destroy()
        })
    }

    private generateUpgrades () {
        BASKET_UPGRADES.forEach((upgrade) => this.generateUpgrade(upgrade))
    }

    private generateUpgrade (upgrade: BasketUpgrade) {
        const clone = this.template.Clone()
        clone.Name = upgrade
        clone.Parent = this.upgrades
        clone.Visible = true

        clone.Upgrade.Text = upgrade
        const level = this.getLevel( upgrade )
        const progressPercent = level / areasMaxLevel[this.area]

        clone.Bar.Progress.Size = UDim2.fromScale( progressPercent >= 0.9 ? progressPercent - 0.03 : progressPercent, clone.Bar.Progress.Size.Y.Scale )
        clone.Level.Text = `LVL ${level}`
        clone.MouseButton1Click.Connect(() => this.displayInfo(upgrade))
    }

    private displayInfo ( upgrade: BasketUpgrade ) {
        this.selectedUpgrade = upgrade
        this.info.Visible = true
        this.info.Upgrade.Text = upgrade
        this.info.Description.Text = BASKET_UPGRADE_DESCRIPTION[upgrade]

        const level = this.getLevel( upgrade )
        const price = (level >= areasMaxLevel[this.area]) ? "MAXED OUT!" : <string>abbreviator.abbreviate(getBasketUpgradePrice( upgrade, level + 1 ))
        const priceString = price === "MAXED OUT!" ? price : `Price: ${price}`
        this.info.Price.Text = priceString

        this.purchase.Visible = price !== "MAXED OUT!"
    }

    private requestUpgrade () {
        Functions.purchaseBasketUpgrade.invoke( this.selectedUpgrade ).andThen( ( result ) => {
            if ( !result ) return
            else if (result === "Max") this.notificationsController.createNotification("You have fully upgraded this!")
            else if (result === "No Money") this.notificationsController.createNotification("You don't have enough money!")
            else if ( result === "Success" ) {
                clientStore.dispatch({type: "updateUpgrade", upgrade: this.selectedUpgrade, amount: this.getLevel(this.selectedUpgrade) + 1})
                this.displayInfo( this.selectedUpgrade )
                this.cleanup()
                this.generateUpgrades()
                this.upgradePurchaseEvent.Fire()
            }
        })
    }

    private getLevel ( upgrade: BasketUpgrade ): number {
        return clientStore.getState().data.basket_upgrades[upgrade]
    }
}