import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>( {
    Name: "getStat",
    Aliases: ["gS getS"],
    Description: "Get stat of a Player",
    Group: "Admin",
    Args: [
        {
            Type: "stat",
            Name: "stat",
            Description: "Stat",
            Optional: true
        },
        {
            Type: "player",
            Name: "player",
            Description: "Player",
            Optional: true
        },
    ]
} )