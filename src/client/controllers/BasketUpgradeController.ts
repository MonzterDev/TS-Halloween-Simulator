import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events, Functions } from "client/network";
import { BasketShopConfig, BasketUpgrades, getBasketUpgradePrice, UPGRADE_DESCRIPTION } from "shared/constants/Basket";
import { AreaTypes } from "shared/constants/Piles";
import { abbreviator } from "shared/util/functions/abbreviate";
import { getClosestUpgradePart } from "shared/util/functions/getClosestPart";
import { isA } from "shared/util/functions/isA";

const areasMaxLevel: Record<AreaTypes, number> = {
    "Spawn": 10,
    "Snow": 20
}

@Controller({})
export class BasketUpgradeController implements OnInit {
    private shops = <Folder>Workspace.FindFirstChild("Shops")

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )
    private test = this.playerGui.WaitForChild( "Currency" )

    private gui = this.playerGui.BasketUpgrade
    private frame = this.gui.Frame
    private upgrades = this.frame.Upgrades
    private info = this.frame.Info
    private purchase = this.info.Buy
    private exit = this.frame.Exit

    private template = this.upgrades.Template

    private sizeLevel = 1
    private rangeLevel = 1
    private powerLevel = 1
    private luckLevel = 1

    private area: AreaTypes = "Spawn"
    private selectedUpgrade: BasketUpgrades = "Range"

    onInit () {
        Functions.getBasketUpgrade.invoke( "range" ).andThen( ( amount ) => {
            if (isA<number>(amount)) this.rangeLevel = amount
        } )
        Functions.getBasketUpgrade.invoke( "size" ).andThen( ( amount ) => {
            if (isA<number>(amount)) this.sizeLevel = amount
        } )
        Functions.getBasketUpgrade.invoke( "power" ).andThen( ( amount ) => {
            if (isA<number>(amount)) this.powerLevel = amount
        } )
        Functions.getBasketUpgrade.invoke( "luck" ).andThen( ( amount ) => {
            if (isA<number>(amount)) this.luckLevel = amount
        } )
        this.generateShopParts()
        this.purchase.MouseButton1Click.Connect( () => this.requestUpgrade() )
        this.exit.MouseButton1Click.Connect( () => this.gui.Enabled = false )
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

    private display ( area: AreaTypes ) {
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

        const level = this.getLevel(upgrade)
        const price = <string>abbreviator.abbreviate(getBasketUpgradePrice( upgrade, level + 1 )) || "MAXED OUT!"
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
                if (this.selectedUpgrade === "Range") this.rangeLevel += 1
                if ( this.selectedUpgrade === "Size" ) this.sizeLevel += 1
                if ( this.selectedUpgrade === "Power" ) this.powerLevel += 1
                if ( this.selectedUpgrade === "Luck" ) this.luckLevel += 1
                this.displayInfo( this.selectedUpgrade )
                this.cleanup()
                this.generateUpgrades()
            }
        })
    }

    private getLevel ( upgrade: BasketUpgrades ): number {
        switch (upgrade) {
            case "Size":
                return this.sizeLevel
            case "Range":
                return this.rangeLevel
            case "Power":
                return this.powerLevel
            case "Luck":
                return this.luckLevel
        }
    }
}