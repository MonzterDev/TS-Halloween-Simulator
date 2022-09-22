import { TypeDefinition, Registry } from "@rbxts/cmdr";
import { PetTypes, Rarities } from "shared/constants/Pets";
import { AreaTypes } from "shared/constants/Piles";

const currencyType: TypeDefinition = {
    Parse: ( value ) => {
        return value
    }
}

export = function ( registry: Registry ) {
    registry.RegisterType( "rarity", registry.Cmdr.Util.MakeEnumType( "rarity", ["Common", "Uncommon", "Rare"] ) )
}