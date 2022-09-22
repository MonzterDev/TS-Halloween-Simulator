import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>( {
    Name: "givePet",
    Aliases: ["gP giveP"],
    Description: "Give Player a Pet",
    Group: "Admin",
    Args: [
        {
            Type: "pet",
            Name: "pet",
            Description: "Pet",
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
    ]
} )