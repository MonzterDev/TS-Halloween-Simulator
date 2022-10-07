import { TypeDefinition, Registry } from "@rbxts/cmdr";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";

const keyOfPlayerData: string[] = []

for ( const [key, value] of pairs( DEFAULT_PLAYER_DATA ) ) {
    keyOfPlayerData.push(tostring(key))
}


export = function ( registry: Registry ) {
    registry.RegisterType( "dataDirectory", registry.Cmdr.Util.MakeEnumType( "dataDirectory", keyOfPlayerData ) )
}