import { TypeDefinition, Registry } from "@rbxts/cmdr";

const currencyType: TypeDefinition = {
    Parse: ( value ) => {
        return value
    }
}

export = function ( registry: Registry ) {
    registry.RegisterType( "passProduct", registry.Cmdr.Util.MakeEnumType( "passProduct", ["100,000 Coins", "Equip More Pets", "Equip More Pets2", "Remove Hatch Cooldown"] ) )
}