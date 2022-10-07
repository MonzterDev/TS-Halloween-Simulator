import { TypeDefinition, Registry } from "@rbxts/cmdr";

export = function ( registry: Registry ) {
    registry.RegisterType( "stat", registry.Cmdr.Util.MakeEnumType( "stat", ["Size", "Range"] ) )
}