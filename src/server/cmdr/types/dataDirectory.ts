import { TypeDefinition, Registry } from "@rbxts/cmdr";
import { AreaTypes } from "shared/constants/Piles";

const currencyType: TypeDefinition = {
    Parse: ( value ) => {
        return value
    }
}

export = function ( registry: Registry ) {
    registry.RegisterType( "area", registry.Cmdr.Util.MakeEnumType( "area", AreaTypes ) )
}