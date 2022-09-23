interface Workspace extends Model {
	Grass: Part & {
		Weld: Weld;
	};
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
	Eggs: Folder & {
		Starter: Part & {
			Prompt: ProximityPrompt;
		};
	};
	Pets: Folder;
	Camera: Camera;
	Baseplate: Part & {
		Texture: Texture;
	};
	Snow: Part & {
		Weld: Weld;
	};
	Piles: Folder & {
		Grass: Folder & {
			Large: Part & {
				Weld: Weld;
			};
			Medium: Part & {
				Weld: Weld;
			};
		};
		Snow: Folder & {
			Large: Part & {
				Weld: Weld;
			};
			Medium: Part & {
				Weld: Weld;
			};
		};
		Spawn: Folder & {
			Large: Part & {
				Weld: Weld;
			};
			Medium: Part & {
				Weld: Weld;
			};
		};
	};
	Sell: Folder & {
		Snow: Part;
		Spawn: Part;
	};
	Shops: Folder & {
		Snow: Part & {
			Weld: Weld;
		};
		Spawn: Part & {
			Weld: Weld;
		};
	};
	Spawn: Part & {
		Weld: Weld;
	};
}
