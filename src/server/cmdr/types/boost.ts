import { TypeDefinition, Registry } from "@rbxts/cmdr";
import { PetTypes, Rarities } from "shared/constants/Pets";
import { AreaTypes } from "shared/constants/Piles";

const currencyType: TypeDefinition = {
    Parse: ( value ) => {
        return value
    }
}

export = function ( registry: Registry ) {
    registry.RegisterType( "boost", registry.Cmdr.Util.MakeEnumType( "boost", ["Luck", "Power"] ) )
}