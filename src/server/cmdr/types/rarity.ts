import { TypeDefinition, Registry } from "@rbxts/cmdr";

export = function ( registry: Registry ) {
    registry.RegisterType( "rarity", registry.Cmdr.Util.MakeEnumType( "rarity", ["Common", "Uncommon", "Rare"] ) )
}