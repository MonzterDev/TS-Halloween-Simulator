interface Workspace extends Model {
	Piles: Folder & {
		["1"]: Part & {
			Weld: Weld;
		};
		["4"]: Part & {
			Weld: Weld;
		};
		["3"]: Part & {
			Weld: Weld;
		};
		["2"]: Part & {
			Weld: Weld;
		};
	};
	Camera: Camera;
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
	Baseplate: Part & {
		Texture: Texture;
	};
}

interface StarterGui extends BasePlayerGui {
	Currency: ScreenGui & {
		Frame: Frame & {
			UIListLayout: UIListLayout;
			PrimaryHolder: ImageLabel & {
				Icon: ImageLabel;
				Amount: TextLabel;
			};
			SecondaryHolder: ImageLabel & {
				Icon: ImageLabel;
				Amount: TextLabel;
			};
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
	};
}

interface ServerStorage extends Instance {
	Candy: Model & {
		Bowl: Part & {
			Mesh: SpecialMesh;
		};
	};
}

interface Player extends Players {
    leaderstats: Folder & {
        Candy: NumberValue
        Money: NumberValue
    }
}