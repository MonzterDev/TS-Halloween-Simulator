import { TypeDefinition, Registry } from "@rbxts/cmdr";
import { PetTypes } from "shared/constants/Pets";
import { AreaTypes } from "shared/constants/Piles";

const currencyType: TypeDefinition = {
    Parse: ( value ) => {
        return value
    }
}

export = function ( registry: Registry ) {
    registry.RegisterType( "pet", registry.Cmdr.Util.MakeEnumType( "pet", ["Dog", "Cat"] ) )
}