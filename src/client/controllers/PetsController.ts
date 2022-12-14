import { Controller, OnStart, OnInit } from "@flamework/core";
import Make from "@rbxts/make";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { DEFAULT_MAX_PET_EQUIPPED_AMOUNT, DEFAULT_MAX_PET_STORAGE_AMOUNT, Pet, PETS, UUID } from "shared/constants/Pets";

const positions = [
    new Vector3( 0, 1, 8 ),
    new Vector3( -7.5, 1, 6 ),
    new Vector3( 7.5, 1, 6 ),
    new Vector3( 5, 1, 9 ),
    new Vector3( -4.5, 1, 9 ),
]
const orientations = [
    new Vector3( 0, -0, 0 ),
    new Vector3( 0, -30, 0 ),
    new Vector3( 0, 30, 0 ),
    new Vector3( 0, 35, 0 ),
    new Vector3( 0, -35, 0 ),
]

interface pet {
    uuid: UUID
    type: Pet
}

@Controller({})
export class PetsController implements OnStart {
    private player = Players.LocalPlayer
    private petsFolder = Workspace.Pets
    private petModels = ReplicatedStorage.Pets

    private pets: Map<number, [pet]> = new Map()

    private dataLoaded = false
    private connection = clientStore.changed.connect( ( newState ) => {
        if ( !this.dataLoaded ) newState.data.pet_inventory.forEach( ( props, uuid ) => {
                if (props.equipped) this.equipPet( this.player, uuid, props.type )
            } )
        else this.connection.disconnect()
    })

    onStart () {
        clientStore.getState().data.pet_inventory.forEach( ( props, uuid ) => {
            if (props.equipped) this.equipPet( this.player, uuid, props.type )
        } )

        Events.equipPet.connect((player, uuid, pet) => this.equipPet(player, uuid, pet))
        Events.unequipPet.connect( ( player, uuid ) => this.unequipPet( player, uuid ) )

        Players.GetPlayers().forEach(( player ) => player.CharacterAdded.Connect( () => task.delay(1, () => this.respawnPet( player ) ) ))
        Players.PlayerAdded.Connect( ( player ) => player.CharacterAdded.Connect( () => task.delay(1, () => this.respawnPet( player ) ) ) )
        Players.PlayerRemoving.Connect( ( player ) => {
            this.pets.delete( player.UserId )
            this.petsFolder.FindFirstChild(player.UserId)?.Destroy()
        })
    }


    public clearActivePets () {
        Players.GetPlayers().forEach( ( player ) => {
            if ( player === this.player ) return

            const pets = this.pets.get( player.UserId )
            if ( !pets ) return
            for ( let i = 0; i < pets.size(); i++ ) {
                this.unequipPet(player, pets[i].uuid)
                i--
            }
        } )
    }

    private animatePets () {
        let mode: .5 | -.5 = .5
        while ( true ) {
            Players.GetPlayers().forEach( ( player ) => {
                const character = player.Character
                if ( !character ) return
                const humanoidRootPart = <BasePart>character.FindFirstChild( "HumanoidRootPart" )
                if ( !humanoidRootPart ) return
                humanoidRootPart.GetChildren().forEach( ( child ) => {
                    if ( child.Name === "PetAttachment" && child.IsA( "Attachment" ) ) child.Position = new Vector3( child.Position.X, child.Position.Y + mode, child.Position.Z )
                })
            } )
            mode = mode === .5 ? -.5 : .5
            task.wait(1)
        }
    }

    private respawnPet ( player: Player ) {
        const folder = this.petsFolder.FindFirstChild( player.UserId )
        if ( folder ) folder.Destroy()

        const character = player.Character
        if ( !character ) return

        const playerPets = this.pets.get( player.UserId )
        if ( !playerPets ) return
        playerPets.forEach( ( pet ) => this.spawnPet( player, pet.uuid, pet.type ) )
    }

    private unequipPet ( player: Player, uuid: UUID ) {
        const playerPets = this.pets.get( player.UserId )
        if ( playerPets ) playerPets.forEach( ( pet ) => {
            if ( pet.uuid === uuid ) playerPets.remove( playerPets.indexOf( pet ) )
        } )

        const folder = this.petsFolder.FindFirstChild( player.UserId )
        if ( !folder ) return

        const pet = folder.FindFirstChild( uuid )
        if ( !pet ) return

        pet.Destroy()
    }

    private equipPet ( player: Player, uuid: UUID, pet: Pet ) {
        this.dataLoaded = true
        const playerPets = this.pets.get( player.UserId )
        if (!playerPets) this.pets.set(player.UserId, [{uuid: uuid, type: pet}])
        else playerPets.push( { type: pet, uuid: uuid } )

        task.spawn(() => this.spawnPet(player, uuid, pet))
    }

    private spawnPet ( player: Player, uuid: UUID, pet: Pet ) {
        const character = player.Character || player.CharacterAdded.Wait()[1]
        if ( !character ) return
        const humanoidRootPart = <Part>character.WaitForChild("HumanoidRootPart")

        const folder = this.petsFolder.FindFirstChild( player.UserId ) || Make( "Folder", {
            Name: tostring( player.UserId ),
            Parent: this.petsFolder
        } )

        const model = <Model>this.petModels.FindFirstChild( pet )?.Clone()
        model.Name = uuid
        model.Parent = folder
        // model.PrimaryPart?.SetNetworkOwner(player)

        model.PivotTo( humanoidRootPart.CFrame )

        const charAttachment = Make( "Attachment", {
            Name: "PetAttachment",
            Parent: humanoidRootPart,
            Visible: false,
        } )
        const petAttachment = Make( "Attachment", {
            Parent: model.PrimaryPart,
            Visible: false
        } )

        const alignPosition = Make( "AlignPosition", {
            Parent: model,
            Attachment0: petAttachment,
            Attachment1: charAttachment,
            RigidityEnabled: true
        } )
        const alignOrientation = Make( "AlignOrientation", {
            Parent: model,
            Attachment0: petAttachment,
            Attachment1: charAttachment,
            RigidityEnabled: true
        } )

        const positionNumber = this.getPetOrder( <Folder>folder )
        model.SetAttribute( "Position", positionNumber )
        charAttachment.Position = positions[positionNumber]
        charAttachment.Orientation = orientations[positionNumber]
    }

    private getPetOrder ( folder: Folder ): number {
        if ( folder.GetChildren().size() === 0 ) return 0

        const activeSlots: number[] = []
        folder.GetChildren().forEach( ( child ) => activeSlots.push( <number>child.GetAttribute( "Position" ) ) )

        for ( let slot = 0; slot < 5; slot++ ) {
            if (!activeSlots.includes(slot)) return slot
        }
        return 0
    }

    public getEquippedPets () {
        const pets: string[] = []
        clientStore.getState().data.pet_inventory.forEach( ( props, uuid ) => {
            if (props.equipped) pets.push(uuid)
        } )
        return pets
    }
}