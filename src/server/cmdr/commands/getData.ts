import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>( {
    Name: "getData",
    Aliases: ["gD getD"],
    Description: "Get data of a Player",
    Group: "Admin",
    Args: [
        {
            Type: "player",
            Name: "player",
            Description: "Player",
            Optional: true
        },
        {
            Type: "dataDirectory",
            Name: "dataDirectory",
            Description: "Data",
            Optional: true
        },
    ]
} )