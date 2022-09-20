import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>( {
    Name: "simulateRange",
    Aliases: ["sim simR"],
    Description: "Simulate the Range around a Player",
    Group: "Admin",
    Args: [
        {
            Type: "number",
            Name: "number",
            Description: "Range",
            Optional: true
        },
    ]
} )