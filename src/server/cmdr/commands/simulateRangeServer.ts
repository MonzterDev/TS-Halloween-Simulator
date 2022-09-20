import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import Make from "@rbxts/make";
import { PlayerDataService } from "server/services/PlayerDataService";
import { BasketUpgradeConfig } from "shared/constants/Basket";

export = function ( context: CommandContext, range: number ) {
    const character = context.Executor.Character
    if ( !character ) return

    const humanoidRootPart = <BasePart>character.FindFirstChild("HumanoidRootPart")

    const playerDataService = Dependency( PlayerDataService )
    const profile = playerDataService.getProfile( context.Executor )
    if ( !profile ) return

    if ( !range ) range = BasketUpgradeConfig.range[profile.data.basket_upgrades.range] * 2

    let part = humanoidRootPart.FindFirstChild("Radius")
    if ( part ) {
        part.Destroy()
        return "Destroyed!"
    }

    part = Make( "Part", {
        Parent: humanoidRootPart,
        Name: "Radius",
        CanCollide: false,
        Shape: Enum.PartType.Cylinder,
        Size: new Vector3( 5, range, range ),
        Orientation: new Vector3( 0, 0, -90 ),
        Position: humanoidRootPart.Position,
        Transparency: .8,
        Color: Color3.fromRGB(255,92,92)
    } )

    const weld = Make( "WeldConstraint", {
        Parent: part,
        Part0: humanoidRootPart,
        Part1: <Part>part,
        Enabled: true
    })

}