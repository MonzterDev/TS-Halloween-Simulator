import { TypeDefinition, Registry } from "@rbxts/cmdr";

export = function ( registry: Registry ) {
    registry.RegisterType( "pet", registry.Cmdr.Util.MakeEnumType( "pet", ["Dog", "Cat"] ) )
}