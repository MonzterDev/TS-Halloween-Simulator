import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events, Functions } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { Area } from "shared/constants/Areas";
import { BasketShopConfig, BasketUpgrades, getBasketUpgradeAsProp, getBasketUpgradePrice, UPGRADE_DESCRIPTION } from "shared/constants/Basket";
import { abbreviator } from "shared/util/functions/abbreviate";
import { getClosestUpgradePart } from "shared/util/functions/getClosestPart";

const areasMaxLevel: Record<Area, number> = {
    "Spawn": 10,
    "Camp": 20
}

@Controller({})
export class BasketUpgradeController implements OnInit {
    private shops = <Folder>Workspace.FindFirstChild("Shops")

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
    private selectedUpgrade: BasketUpgrades = "Range"

    onInit () {
        this.generateShopParts()
        this.purchase.MouseButton1Click.Connect( () => this.requestUpgrade() )
        this.exit.MouseButton1Click.Connect( () => {
            this.gui.Enabled = false
            this.info.Visible = false
        } )
        Events.displayBasketUpgradeShop.connect( ( area ) => this.display( area ) )
    }

    public teleportToShop () {
        const closestPart = getClosestUpgradePart(this.player, this.shops)
        const character = this.player.Character
        if ( !character || !closestPart ) return
        character.PivotTo(closestPart.CFrame)
    }

    private generateShopParts () {
        this.shops.GetChildren().forEach( ( part ) => {
            if ( !part.IsA( "Part" ) ) return
            part.Touched.Connect( ( otherPart ) => {
                if ( !otherPart.Parent?.IsA( "Model" ) ) return
                const character = otherPart.FindFirstAncestorWhichIsA( "Model" )
                if ( !character ) return
                const player = Players.GetPlayerFromCharacter( character )
                if ( !player ) return
                if (player === this.player) this.display(part.Name)
            })
        })
    }

    private display ( area: Area ) {
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
        BasketUpgrades.forEach((upgrade) => this.generateUpgrade(upgrade))
    }

    private generateUpgrade (upgrade: BasketUpgrades) {
        const clone = this.template.Clone()
        clone.Name = upgrade
        clone.Parent = this.upgrades
        clone.Visible = true

        clone.Upgrade.Text = upgrade
        const level = this.getLevel(upgrade)
        clone.Bar.Progress.Size = UDim2.fromScale( level / areasMaxLevel[this.area], 1 )
        clone.Level.Text = `LVL ${level}`
        clone.MouseButton1Click.Connect(() => this.displayInfo(upgrade))
    }

    private displayInfo ( upgrade: BasketUpgrades ) {
        this.selectedUpgrade = upgrade
        this.info.Visible = true
        this.info.Upgrade.Text = upgrade
        this.info.Description.Text = UPGRADE_DESCRIPTION[upgrade]

        const level = this.getLevel( upgrade )
        const price = (level >= areasMaxLevel[this.area]) ? "MAXED OUT!" : <string>abbreviator.abbreviate(getBasketUpgradePrice( upgrade, level + 1 ))
        const priceString = price === "MAXED OUT!" ? price : `Price: ${price}`
        this.info.Price.Text = priceString

        this.purchase.Visible = price !== "MAXED OUT!"
    }

    private requestUpgrade () {
        Functions.purchaseBasketUpgrade.invoke( this.selectedUpgrade ).andThen( ( result ) => {
            if ( !result ) return
            if (result === "Max") print("Max")
            if (result === "No Money") print("No Money")
            if ( result === "Success" ) {
                clientStore.dispatch({type: "updateUpgrade", upgrade: getBasketUpgradeAsProp(this.selectedUpgrade), amount: this.getLevel(this.selectedUpgrade) + 1})
                this.displayInfo( this.selectedUpgrade )
                this.cleanup()
                this.generateUpgrades()
            }
        })
    }

    private getLevel ( upgrade: BasketUpgrades ): number {
        return clientStore.getState().data.basket_upgrades[getBasketUpgradeAsProp(upgrade)]
    }
}