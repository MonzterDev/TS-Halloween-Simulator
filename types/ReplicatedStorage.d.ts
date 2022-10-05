interface ReplicatedStorage extends Instance {
	Pets: Folder & {
		Turtle: Model & {
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeTurtle"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Dog: Model & {
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape"]: MeshPart & {
				Decal: Decal;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeDog"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Cat: Model & {
			["Meshes/PetShape"]: MeshPart & {
				Decal: Decal;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Bunny: Model & {
			["Meshes/PetShape"]: MeshPart & {
				Decal: Decal;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Pig: Model & {
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapePig"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeElephant"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape"]: MeshPart & {
				Decal: Decal;
			};
		};
		Fox: Model & {
			["Meshes/PetShapeCatEars"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
	};
	TS: Folder & {
		network: ModuleScript;
		constants: Folder & {
			Pets: ModuleScript;
			Gui: ModuleScript;
			Settings: ModuleScript;
			Gamepasses: ModuleScript;
			Currencies: ModuleScript;
			PlayerData: ModuleScript;
			Piles: ModuleScript;
			Basket: ModuleScript;
		};
		util: Folder & {
			classes: Folder & {
				PlayerCooldown: ModuleScript;
			};
			functions: Folder & {
				forEveryPlayer: ModuleScript;
				toTileCase: ModuleScript;
				abbreviate: ModuleScript;
				getClosestPart: ModuleScript;
				makeDescendantsInvisible: ModuleScript;
				forEachRemove: ModuleScript;
			};
		};
		components: Folder;
		types: Folder & {
			PlayerData: ModuleScript;
		};
	};
	Car: Model & {
		Wheels: Model & {
			FR: Part & {
				SuspensionFixed: Model & {
					Spring: Part & {
						SpringConstraint: SpringConstraint;
						Attachment1: Attachment;
						Attachment0: Attachment;
					};
				};
				Fixed: Model & {
					Ski: UnionOperation;
				};
				Mesh: CylinderMesh;
				Parts: Model;
			};
			RL: Part & {
				Fixed: Model & {
					Track: Model & {
						Track: UnionOperation;
					};
				};
				Mesh: CylinderMesh;
				Parts: Model;
			};
			RR: Part & {
				Fixed: Model & {
					Track: Model & {
						Track: UnionOperation;
					};
				};
				Mesh: CylinderMesh;
				Parts: Model;
			};
			FL: Part & {
				SuspensionFixed: Model & {
					Spring: Part & {
						SpringConstraint: SpringConstraint;
						Attachment1: Attachment;
						Attachment0: Attachment;
					};
				};
				Fixed: Model & {
					Ski: UnionOperation;
				};
				Mesh: CylinderMesh;
				Parts: Model;
			};
		};
		Body: Model & {
			CarBody: Model & {
				Down: UnionOperation;
				Taillight: UnionOperation & {
					SpotLight: SpotLight & {
						["On/Off Light"]: Script;
					};
				};
				Color: UnionOperation;
				Headlight: UnionOperation & {
					SpotLight: SpotLight & {
						["On/Off Light"]: Script;
					};
				};
				Lightball: UnionOperation;
				Lightbar: UnionOperation;
			};
		};
	};
	Egg: Folder & {
		Starter: Model & {
			Handle: Part & {
				Mesh: SpecialMesh;
				HatAttachment: Attachment;
			};
		};
	};
	HealthDisplay: BillboardGui & {
		Health: TextLabel;
		Bar: ImageLabel & {
			Progress: ImageLabel;
		};
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["boat-tween"]: Folder & {
				src: ModuleScript & {
					Lerps: ModuleScript;
					TweenFunctions: ModuleScript;
					Bezier: ModuleScript;
					types: Folder;
				};
			};
			abbreviate: Folder & {
				src: ModuleScript & {
					commify: ModuleScript;
					abbreviate: ModuleScript;
					numberToString: ModuleScript;
					setSetting: ModuleScript;
					numbersToSortedString: ModuleScript;
					stringToNumber: ModuleScript;
				};
			};
			profileservice: Folder & {
				src: ModuleScript;
			};
			rodux: Folder & {
				src: ModuleScript & {
					combineReducers: ModuleScript;
					NoYield: ModuleScript;
					createReducer: ModuleScript;
					loggerMiddleware: ModuleScript;
					makeActionCreator: ModuleScript;
					thunkMiddleware: ModuleScript;
					prettyPrint: ModuleScript;
					Store: ModuleScript;
					Signal: ModuleScript;
				};
			};
			formatnumber: Folder & {
				src: ModuleScript & {
					DoubleConversion: Folder & {
						proxy: ModuleScript;
						diy_fp: ModuleScript;
						LICENSE: ModuleScript;
						uint64_t: ModuleScript;
						DoubleToStringConverter: ModuleScript;
						ieee: ModuleScript;
						strtod: ModuleScript;
						cached_power: ModuleScript;
						grisu3: ModuleScript;
						DoubleToDecimalConverter: ModuleScript;
						bignum_dtoa: ModuleScript;
						bignum: ModuleScript;
						DecimalToDoubleConverter: ModuleScript;
					};
					_aux: ModuleScript;
					config: ModuleScript;
				};
			};
			make: ModuleScript & {
				node_modules: Folder & {
					["@rbxts"]: Folder & {
						["compiler-types"]: Folder & {
							types: Folder;
						};
					};
				};
			};
			types: Folder & {
				include: Folder & {
					generated: Folder;
				};
			};
			t: Folder & {
				lib: Folder & {
					ts: ModuleScript;
				};
			};
			["compiler-types"]: Folder & {
				types: Folder;
			};
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
			["viewport-model"]: Folder & {
				src: ModuleScript;
			};
			["format-number"]: Folder & {
				src: ModuleScript & {
					DoubleConversion: Folder & {
						proxy: ModuleScript;
						diy_fp: ModuleScript;
						LICENSE: ModuleScript;
						uint64_t: ModuleScript;
						DoubleToStringConverter: ModuleScript;
						ieee: ModuleScript;
						strtod: ModuleScript;
						cached_power: ModuleScript;
						grisu3: ModuleScript;
						DoubleToDecimalConverter: ModuleScript;
						bignum_dtoa: ModuleScript;
						bignum: ModuleScript;
						DecimalToDoubleConverter: ModuleScript;
					};
					_aux: ModuleScript;
					config: ModuleScript;
				};
			};
			services: ModuleScript;
			["object-utils"]: ModuleScript;
			maid: Folder & {
				Maid: ModuleScript;
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
			signal: ModuleScript;
		};
	};
}
