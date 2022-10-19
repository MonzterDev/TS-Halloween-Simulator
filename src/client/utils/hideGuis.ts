import { Players, StarterGui } from "@rbxts/services"

const player = Players.LocalPlayer
const playerGui = <StarterGui>player.WaitForChild( "PlayerGui" )

const GUIS_TO_HIDE = ["BasketUpgrade", "Inventory", "Settings", "Quests", "Map", "Gifts", "Codes", "MonetizationShop", "PetIndex"]

export function hideGuis ( openingGui: ScreenGui = new Instance("ScreenGui") ) {
    GUIS_TO_HIDE.forEach( ( guiName ) => {
        const gui = playerGui.FindFirstChild( guiName )
        if ( !gui || !gui.IsA( "ScreenGui" ) || gui.Name === openingGui.Name ) return

        gui.Enabled = false
    } )

    playerGui.AreaPurchase.Enabled = openingGui.Name === "AreaPurchase"
}