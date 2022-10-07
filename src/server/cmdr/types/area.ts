import { TypeDefinition, Registry } from "@rbxts/cmdr";
import { AREAS } from "shared/constants/Areas";

export = function ( registry: Registry ) {
    registry.RegisterType( "area", registry.Cmdr.Util.MakeEnumType( "area", AREAS ) )
}