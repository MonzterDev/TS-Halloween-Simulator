import { Controller, OnStart, OnInit } from "@flamework/core";
import Make from "@rbxts/make";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Events } from "client/network";
import { PetTypes, UUID } from "shared/constants/Pets";

const positions = [
    new Vector3( 0, 1, 10 ),
    new Vector3( -7.5, 1, 8 ),
    new Vector3( 7.5, 1, 8 ),
]
const orientations = [
    new Vector3( 0, -90, 0 ),
    new Vector3( 0, -120, 0 ),
    new Vector3( 0, -60, 0 ),
]

@Controller({})
export class PetsController implements OnInit {
    private petsFolder = Workspace.Pets
    private petModels = ReplicatedStorage.Pets

    onInit () {
        Events.equipPet.connect((player, uuid, pet) => this.equipPet(player, uuid, pet))
    }

    private equipPet ( player: Player, uuid: UUID, pet: PetTypes ) {
        print("GOT!")
        const character = player.Character
        if ( !character ) return
        const humanoidRootPart = character.FindFirstChild("HumanoidRootPart")

        const folder = this.petsFolder.FindFirstChild( player.UserId ) || Make( "Folder", {
            Name: tostring( player.UserId ),
            Parent: this.petsFolder
        } )

        const model = <Model>this.petModels.FindFirstChild( pet )?.Clone()
        model.Name = uuid
        model.Parent = folder
        // model.PrimaryPart?.SetNetworkOwner(player)

        model.PivotTo( character.GetPrimaryPartCFrame() )

        const charAttachment = Make( "Attachment", {
            Parent: humanoidRootPart,
            Visible: false
        } )
        const petAttachment = Make( "Attachment", {
            Parent: model.PrimaryPart,
            Visible: false
        } )

        const alignPosition = Make( "AlignPosition", {
            Parent: model,
            MaxForce: 25_000,
            Attachment0: petAttachment,
            Attachment1: charAttachment,
            Responsiveness: 25
        } )
        const alignOrientation = Make( "AlignOrientation", {
            Parent: model,
            MaxTorque: 25_000,
            Attachment0: petAttachment,
            Attachment1: charAttachment,
            Responsiveness: 25
        } )

        const positionNumber = this.getPetOrder( <Folder>folder )
        model.SetAttribute( "Position", positionNumber )
        charAttachment.Position = positions[positionNumber]
        charAttachment.Orientation = orientations[positionNumber]
    }

    private getPetOrder ( folder: Folder ): number {
        if ( folder.GetChildren().size() === 0 ) return 1

        const activeSlots: number[] = []
        folder.GetChildren().forEach( ( child ) => activeSlots.push( <number>child.GetAttribute( "Position" ) ) )

        for ( let slot = 1; slot === 5; slot++ ) {
            if (!activeSlots.includes(slot)) return slot
        }
        return 1
    }

}