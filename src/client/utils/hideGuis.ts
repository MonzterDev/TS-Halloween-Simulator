import { Players } from "@rbxts/services"

const player = Players.LocalPlayer
const playerGui = <PlayerGui>player.WaitForChild( "PlayerGui" )

const GUIS_TO_HIDE = ["BasketUpgrade", "BoostInventory", "Inventory", "PetInventory", "Settings"]

export function hideGuis ( openingGui: ScreenGui ) {
    GUIS_TO_HIDE.forEach( ( guiName ) => {
        const gui = playerGui.FindFirstChild( guiName )
        if ( !gui || !gui.IsA( "ScreenGui" ) || gui.Name === openingGui.Name ) return

        if (openingGui.Name === "Inventory" && gui.Name === "BoostInventory") return
        if (openingGui.Name === "Inventory" && gui.Name === "PetInventory") return

        gui.Enabled = false
    })
}