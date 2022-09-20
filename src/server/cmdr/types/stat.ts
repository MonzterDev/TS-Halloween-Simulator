import { TypeDefinition, Registry } from "@rbxts/cmdr";

const currencyType: TypeDefinition = {
    Parse: ( value ) => {
        return value
    }
}

export = function ( registry: Registry ) {
    registry.RegisterType( "stat", registry.Cmdr.Util.MakeEnumType( "stat", ["Size", "Range"] ) )
}