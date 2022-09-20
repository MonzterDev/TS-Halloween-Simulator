
/**
 * Returns a Part found within the instance, that is closest to the Player
 * @param player
 * @param instance
 * @returns closest part
 */
export function getClosestUpgradePart ( player: Player, instance: Instance ): BasePart | false {
    const character = player.Character
    if ( !character ) return false
    const humanoidRootPart = <BasePart>character.FindFirstChild("HumanoidRootPart")

    let closestPart
    let closestDistance = 999
    instance.GetChildren().forEach( ( part ) => {
        if ( !part.IsA( "BasePart" ) ) return
        const distance = ( humanoidRootPart.Position.sub( part.Position ) ).Magnitude
        if ( distance < closestDistance ) {
            closestDistance = distance
            closestPart = part
        }
    } )

    return closestPart || false
}
