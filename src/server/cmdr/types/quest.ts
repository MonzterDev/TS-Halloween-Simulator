import { TypeDefinition, Registry } from "@rbxts/cmdr";
import { QUESTS } from "shared/constants/Quests";

export = function ( registry: Registry ) {
    registry.RegisterType( "quest", registry.Cmdr.Util.MakeEnumType( "quest", QUESTS ) )
}