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
        hideGuis(gui)
    }
}