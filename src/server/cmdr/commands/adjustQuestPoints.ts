import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>( {
    Name: "adjustQuestPoints",
    Aliases: ["aQ aQP"],
    Description: "Adjusts the points of a Quest for a Player",
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
            Type: "number",
            Name: "number",
            Description: "Points",
        },
        {
            Type: "player",
            Name: "player",
            Description: "Player",
            Optional: true
        },
    ]
} )