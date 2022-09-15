import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>( {
    Name: "openShop",
    Aliases: ["oS oShop"],
    Description: "Open Shop",
    Group: "Admin",
    Args: [
        {
            Type: "area",
            Name: "area",
            Description: "Area",
            Optional: true
        },
    ]
} )