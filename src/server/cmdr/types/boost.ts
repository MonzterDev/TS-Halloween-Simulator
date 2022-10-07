import { TypeDefinition, Registry } from "@rbxts/cmdr";

export = function ( registry: Registry ) {
    registry.RegisterType( "boost", registry.Cmdr.Util.MakeEnumType( "boost", ["Luck", "Power"] ) )
}