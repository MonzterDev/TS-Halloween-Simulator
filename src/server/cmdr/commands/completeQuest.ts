import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>( {
    Name: "completeQuest",
    Aliases: ["cQ completeQ"],
    Description: "Completes a Quest for a Player",
    Group: "Admin",
    Args: [
        {
            Type: "quest",
            Name: "quest",
            Description: "Quest",
        },
        {
            Type: "number",
            Name: "number",
            Description: "Tier",
        },
        {
            Type: "boolean",
            Name: "boolean",
            Description: "Complete previous quests",
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