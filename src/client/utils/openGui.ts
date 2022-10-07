import { hideGuis } from "./hideGuis"

export function openGui ( gui: ScreenGui ) {
    if ( gui.Enabled ) gui.Enabled = false
    else {
        gui.Enabled = true
        hideGuis(gui)
    }
}