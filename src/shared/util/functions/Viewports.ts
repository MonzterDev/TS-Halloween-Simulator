import Make from "@rbxts/make"

export function CleanViewport ( viewportFrame: ViewportFrame ) {
    const model = viewportFrame.FindFirstChildOfClass( "Model" )
    model?.Destroy()
}

export function GenerateViewport ( viewportFrame: ViewportFrame, model: Model ) {
    let camera = viewportFrame.FindFirstChildOfClass( "Camera" )
    if ( !camera ) {
        camera = Make( "Camera", {
            FieldOfView: 70,
            Parent: viewportFrame
        } )
        viewportFrame.CurrentCamera = camera
    }

    model.Parent = viewportFrame
    model.PivotTo( new CFrame().mul( CFrame.Angles( 0, math.rad( 90 ), 0 ) ) )

    camera.CFrame = new CFrame(new Vector3(0, 0, 3), model.PrimaryPart?.Position!)
}