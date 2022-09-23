interface Workspace extends Model {
	Grass: Part & {
		Weld: Weld;
	};
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
	Eggs: Folder & {
		Common: Part & {
			Prompt: ProximityPrompt;
		};
	};
	Camera: Camera;
	Baseplate: Part & {
		Texture: Texture;
	};
	Snow: Part & {
		Weld: Weld;
	};
	Pets: Folder
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

interface ServerStorage extends Instance {
	Piles: Folder & {
		Small: Model & {
			Bowl: Part & {
				Mesh: SpecialMesh;
			};
			Part: Part & {
				Mesh: SpecialMesh;
			};
		};
		Large: Model & {
			Bowl: Part & {
				Mesh: SpecialMesh;
			};
			Part: Part & {
				Mesh: SpecialMesh;
			};
		};
		Medium: Model & {
			Bowl: Part & {
				Mesh: SpecialMesh;
			};
			Part: Part & {
				Mesh: SpecialMesh;
			};
		};
	};
}

interface Player extends Players {
    leaderstats: Folder & {
        Candy: NumberValue
        Money: NumberValue
    }
}

interface ReplicatedStorage extends Instance {
	HealthDisplay: BillboardGui & {
		Health: TextLabel;
		Bar: ImageLabel & {
			Progress: ImageLabel;
		};
	};
	Pets: Folder
	TS: Folder & {
		network: ModuleScript;
		util: Folder & {
			functions: Folder & {
				forEveryPlayer: ModuleScript;
				toTileCase: ModuleScript;
			};
		};
		types: Folder & {
			PlayerData: ModuleScript;
		};
		components: Folder;
		constants: ModuleScript;
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			profileservice: Folder & {
				src: ModuleScript;
			};
			t: Folder & {
				lib: Folder & {
					ts: ModuleScript;
				};
			};
			["compiler-types"]: Folder & {
				types: Folder;
			};
			["object-utils"]: ModuleScript;
			["@flamework"]: Folder & {
				core: Folder & {
					out: ModuleScript & {
						reflect: ModuleScript;
						modding: ModuleScript;
						flamework: ModuleScript;
					};
				};
				components: Folder & {
					out: ModuleScript;
				};
				networking: Folder & {
					out: ModuleScript & {
						events: Folder & {
							createClientHandler: ModuleScript;
							createServerHandler: ModuleScript;
							createNetworkingEvent: ModuleScript;
						};
						functions: Folder & {
							createClientHandler: ModuleScript;
							createNetworkingFunction: ModuleScript;
							createServerHandler: ModuleScript;
							errors: ModuleScript;
						};
						handlers: ModuleScript;
						middleware: Folder & {
							createMiddlewareProcessor: ModuleScript;
							skip: ModuleScript;
						};
						util: Folder & {
							populateInstanceMap: ModuleScript;
						};
					};
				};
			};
			signal: ModuleScript;
			maid: Folder & {
				Maid: ModuleScript;
			};
			services: ModuleScript;
			make: ModuleScript & {
				node_modules: Folder & {
					["@rbxts"]: Folder & {
						["compiler-types"]: Folder & {
							types: Folder;
						};
					};
				};
			};
			cmdr: Folder & {
				Cmdr: ModuleScript & {
					CreateGui: ModuleScript;
					Shared: Folder & {
						Registry: ModuleScript;
						Dispatcher: ModuleScript;
						Command: ModuleScript;
						Argument: ModuleScript;
						Util: ModuleScript;
					};
					BuiltInTypes: Folder & {
						PlayerId: ModuleScript;
						Type: ModuleScript;
						Vector: ModuleScript;
						URL: ModuleScript;
						UserInput: ModuleScript;
						BindableResource: ModuleScript;
						StoredKey: ModuleScript;
						Team: ModuleScript;
						Primitives: ModuleScript;
						Player: ModuleScript;
						BrickColor: ModuleScript;
						MathOperator: ModuleScript;
						Command: ModuleScript;
						Color3: ModuleScript;
						ConditionFunction: ModuleScript;
						Duration: ModuleScript;
					};
					BuiltInCommands: Folder & {
						help: ModuleScript;
						Admin: Folder & {
							gotoPlaceServer: ModuleScript;
							kill: ModuleScript;
							teleport: ModuleScript;
							kickServer: ModuleScript;
							killServer: ModuleScript;
							respawn: ModuleScript;
							respawnServer: ModuleScript;
							gotoPlace: ModuleScript;
							kick: ModuleScript;
							teleportServer: ModuleScript;
							announce: ModuleScript;
							announceServer: ModuleScript;
						};
						Debug: Folder & {
							getPlayerPlaceInstance: ModuleScript;
							version: ModuleScript;
							thru: ModuleScript;
							blink: ModuleScript;
							uptime: ModuleScript;
							position: ModuleScript;
							fetchServer: ModuleScript;
							uptimeServer: ModuleScript;
							getPlayerPlaceInstanceServer: ModuleScript;
							fetch: ModuleScript;
						};
						Utility: Folder & {
							rand: ModuleScript;
							jsonArrayEncode: ModuleScript;
							pick: ModuleScript;
							echo: ModuleScript;
							bind: ModuleScript;
							["var"]: ModuleScript;
							replace: ModuleScript;
							alias: ModuleScript;
							hover: ModuleScript;
							varSetServer: ModuleScript;
							varServer: ModuleScript;
							jsonArrayDecode: ModuleScript;
							varSet: ModuleScript;
							run: ModuleScript;
							runLines: ModuleScript;
							unbind: ModuleScript;
							history: ModuleScript;
							runif: ModuleScript;
							clear: ModuleScript;
							len: ModuleScript;
							resolve: ModuleScript;
							math: ModuleScript;
							edit: ModuleScript;
						};
					};
					CmdrClient: ModuleScript & {
						CmdrInterface: ModuleScript & {
							AutoComplete: ModuleScript;
							Window: ModuleScript;
						};
						DefaultEventHandlers: ModuleScript;
					};
					Initialize: ModuleScript;
				};
				TS: ModuleScript;
			};
			types: Folder & {
				include: Folder & {
					generated: Folder;
				};
			};
		};
	};
}
