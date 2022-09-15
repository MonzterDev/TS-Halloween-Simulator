import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events, Functions } from "client/network";
import { BasketShopConfig, BasketUpgrades, getBasketUpgradePrice, UPGRADE_DESCRIPTION } from "shared/constants/Basket";
import { AreaTypes } from "shared/constants/Piles";
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

    private template = this.upgrades.Template

    private sizeLevel = 1
    private rangeLevel = 1

    private area: AreaTypes = "Spawn"

    onInit () {
        Functions.getBasketUpgrade.invoke( "range" ).andThen( ( amount ) => {
            if (isA<number>(amount)) this.rangeLevel = amount
        } )
        Functions.getBasketUpgrade.invoke( "size" ).andThen( ( amount ) => {
            if (isA<number>(amount)) this.sizeLevel = amount
        } )
        this.generateShopParts()
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
        this.generateUpgrade("Range")
        this.generateUpgrade( "Size" )
    }

    private generateUpgrade (upgrade: BasketUpgrades) {
        const clone = this.template.Clone()
        clone.Name = upgrade
        clone.Parent = this.upgrades
        clone.Visible = true

        clone.Upgrade.Text = upgrade
        const level = upgrade === "Range" ? this.rangeLevel : this.sizeLevel
        clone.Bar.Progress.Size = UDim2.fromScale( level / areasMaxLevel[this.area], 1 )
        clone.Level.Text = `LVL ${level}`
        clone.MouseButton1Click.Connect(() => this.displayInfo(upgrade))
    }

    private displayInfo ( upgrade: BasketUpgrades ) {
        this.info.Visible = true
        this.info.Upgrade.Text = upgrade
        this.info.Description.Text = UPGRADE_DESCRIPTION[upgrade]

        const level = upgrade === "Range" ? this.rangeLevel : this.sizeLevel
        this.info.Price.Text = `Price: ${getBasketUpgradePrice(upgrade, level)}`
    }
}