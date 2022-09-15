export function makeDescendantsInvisible ( instance: Instance, invisible: boolean ) {
    instance.GetDescendants().forEach( ( descendant ) => {
        if ( descendant.IsA( "BasePart" ) ) {
            descendant.Transparency = invisible ? 1 : 0
        }
    })
}