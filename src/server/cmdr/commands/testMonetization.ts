import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>( {
    Name: "testMonetization",
    Aliases: ["tM testM"],
    Description: "Test Developer Product & Gamepasses",
    Group: "Admin",
    Args: [
        {
            Type: "passProduct",
            Name: "passProduct",
            Description: "Gamepass OR Dev Product",
        },
        {
            Type: "player",
            Name: "player",
            Description: "Player",
            Optional: true
        },
    ]
} )