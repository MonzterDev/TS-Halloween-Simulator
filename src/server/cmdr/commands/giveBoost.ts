import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>( {
    Name: "giveBoost",
    Aliases: ["gB giveB"],
    Description: "Give Player a Boost",
    Group: "Admin",
    Args: [
        {
            Type: "boost",
            Name: "boost",
            Description: "Boost",
        },
        {
            Type: "rarity",
            Name: "rarity",
            Description: "Rarity",
            Optional: true
        },
        {
            Type: "player",
            Name: "player",
            Description: "Player",
            Optional: true
        },
        {
            Type: "number",
            Name: "amount",
            Description: "Amount",
            Optional: true
        },
    ]
} )