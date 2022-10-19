import { Clack, Prefer } from "@rbxts/clack"
import { GuiService, Players, UserInputService } from "@rbxts/services"
import { hideGuis } from "./hideGuis"


export function resetScrollingFrame ( scrollingFrame: ScrollingFrame ) {
    scrollingFrame.CanvasPosition = new Vector2(0, 0)
}

export function openGui ( gui: ScreenGui ) {
    if ( gui.Enabled ) gui.Enabled = false
    else {
        gui.Enabled = true
        gui.GetDescendants().forEach( ( descendant ) => {
            if ( descendant.IsA( "ScrollingFrame" ) ) resetScrollingFrame( descendant )
        })
        hideGuis( gui )

        const container = <Frame> gui.FindFirstChild( "Container", true ) ?? gui.FindFirstChildWhichIsA("ScrollingFrame", true)
        if ( container ) setSelectedObject(container)
        if (gui.Parent?.Parent === Players.LocalPlayer) makeButtonsSelectable(false)
    }
}

export function makeButtonsSelectable ( selectable: boolean ) {
    const playerGui = <StarterGui>Players.LocalPlayer.FindFirstChild( "PlayerGui" )
    if ( !playerGui ) return

    const buttonsGui = <StarterGui["Buttons"]>playerGui.FindFirstChild("Buttons")
    buttonsGui.Frame.GetChildren().forEach( ( child ) => {
        if ( !child.IsA( "ImageButton" ) || !child.Visible ) return
        child.Selectable = selectable
    } )

    const giftButtonGui = <StarterGui["GiftButton"]>playerGui.FindFirstChild( "GiftButton" )
    giftButtonGui.Button.Selectable = selectable

    const currencyGui = <StarterGui["Currency"]>playerGui.FindFirstChild( "Currency" )
    currencyGui.Frame.MoneyHolder.Purchase.Selectable = selectable
}

export function closeGui ( gui: ScreenGui ) {
    gui.Enabled = false
    makeButtonsSelectable( true )
    GuiService.SelectedObject = undefined
}

const prefer = new Prefer()

export function setSelectedObject ( object: GuiObject ) {
    if ( prefer.getPreferredInput() !== Clack.InputType.Gamepad ) return

    GuiService.SelectedObject = object
}
