import Abbreviator from "@rbxts/abbreviate"

export const abbreviator = new Abbreviator()
abbreviator.setSetting( 'suffixTable', ['K', 'M', 'B', 'T'] )
abbreviator.setSetting( 'decimalPlaces', 2 )

export const noDecimalPlaceAbbreviator = new Abbreviator()
noDecimalPlaceAbbreviator.setSetting( 'suffixTable', ['K', 'M', 'B', 'T'] )
noDecimalPlaceAbbreviator.setSetting( 'decimalPlaces', 0 )
