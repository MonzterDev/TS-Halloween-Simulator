interface ReplicatedStorage extends Instance {
	Egg: Folder & {
		Camp: Model & {
			Handle: Part & {
				Mesh: SpecialMesh;
				HatAttachment: Attachment;
			};
		};
		Halloween: Model & {
			Handle: Part & {
				Mesh: SpecialMesh;
				HatAttachment: Attachment;
			};
		};
		Spawn: Model & {
			Handle: Part & {
				Mesh: SpecialMesh;
				HatAttachment: Attachment;
			};
		};
	};
	TS: Folder & {
		network: ModuleScript;
		constants: Folder & {
			Notifications: ModuleScript;
			Areas: ModuleScript;
			Group: ModuleScript;
			Currencies: ModuleScript;
			Boosts: ModuleScript;
			Piles: ModuleScript;
			Basket: ModuleScript;
			Pets: ModuleScript;
			PlayerData: ModuleScript;
			Settings: ModuleScript;
			Codes: ModuleScript;
			Gifts: ModuleScript;
			Monetization: ModuleScript;
			Quests: ModuleScript;
			Gui: ModuleScript;
		};
		util: Folder & {
			classes: Folder & {
				PlayerCooldown: ModuleScript;
			};
			functions: Folder & {
				cleanString: ModuleScript;
				abbreviate: ModuleScript;
				forEveryPlayer: ModuleScript;
				toTileCase: ModuleScript;
				timeToString: ModuleScript;
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
	ArrowGuide: Beam;
	Pets: Folder & {
		Ant: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		["Green Slime"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
			MeshPart: MeshPart;
		};
		["Blue Slime"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
			MeshPart: MeshPart;
		};
		Penguin: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Elephant: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
			Ears: Folder;
		};
		Dino: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Alien: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Crab: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		["Ghost Dragon"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Kitty: Model & {
			Part: Part & {
				Decal: Decal;
			};
			["Meshes/runner (77)"]: MeshPart;
		};
		["Baby Slime"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
		};
		Duck: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Ghost: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Monkey: Model & {
			Part: Part & {
				Decal: Decal;
			};
		};
		["Slime King"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			MeshPart: MeshPart;
		};
		Demon: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Dragoon: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Fly: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Wolf: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		["Yellow Slime"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
			MeshPart: MeshPart;
		};
		["Void Vampire"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart & {
				Attachment: Attachment & {
					Core: ParticleEmitter;
					Wave: ParticleEmitter;
					Rays_Thick: ParticleEmitter;
					Rays_Thin: ParticleEmitter;
				};
			};
		};
		["Void Angel"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Spider: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Zelot: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
			MeshPart: MeshPart;
		};
		Fox: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Devil: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		["Baby Bee"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
		};
		["Purple Slime"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
			MeshPart: MeshPart;
		};
		Scorch: Model & {
			Part: Part & {
				Decal: Decal;
				Attachment: Attachment & {
					Rays: ParticleEmitter;
					Vortex: ParticleEmitter;
				};
			};
			Primary: MeshPart & {
				Decal: Decal;
			};
		};
		Rhino: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		["Red Slime"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
			MeshPart: MeshPart;
		};
		Piggy: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		Mouse: Model & {
			Part: Part & {
				Decal: Decal;
			};
			["Meshes/runner (77)"]: MeshPart;
			Primary: MeshPart;
		};
		["Fire Demon"]: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart & {
				Attachment: Attachment & {
					Rays: ParticleEmitter;
					Glow: ParticleEmitter;
					Vortex: ParticleEmitter;
				};
			};
		};
		Beast: Model & {
			Part: Part & {
				Decal: Decal;
			};
			Primary: MeshPart;
		};
		["Ghost Dog"]: Model & {
			Part: Part & {
				Decal: Decal;
				WeldConstraint: WeldConstraint;
			};
			Primary: MeshPart;
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
			[".viewport-model-Rsot613G"]: Folder & {
				src: ModuleScript;
			};
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
			[".t-D8lrT8C1"]: Folder & {
				lib: Folder & {
					ts: ModuleScript;
				};
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
			make: ModuleScript & {
				node_modules: Folder & {
					["@rbxts"]: Folder & {
						["compiler-types"]: Folder & {
							types: Folder;
						};
					};
				};
			};
			["@rbxts"]: Folder & {
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
						abbreviate: ModuleScript;
						stringToNumber: ModuleScript;
						numberToString: ModuleScript;
						setSetting: ModuleScript;
						numbersToSortedString: ModuleScript;
						commify: ModuleScript;
					};
				};
				services: ModuleScript;
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
				gameanalytics: ModuleScript & {
					["gameanalytics-sdk"]: ModuleScript & {
						GameAnalyticsClient: ModuleScript;
						GameAnalytics: ModuleScript & {
							Logger: ModuleScript;
							Version: ModuleScript;
							HttpApi: ModuleScript & {
								HashLib: ModuleScript & {
									Base64: ModuleScript;
								};
							};
							GAErrorSeverity: ModuleScript;
							Utilities: ModuleScript;
							State: ModuleScript;
							Threading: ModuleScript;
							Events: ModuleScript;
							Postie: ModuleScript;
							Validation: ModuleScript;
							GAResourceFlowType: ModuleScript;
							Store: ModuleScript;
							GAProgressionStatus: ModuleScript;
						};
					};
				};
				clack: Folder & {
					out: ModuleScript & {
						touch: ModuleScript;
						prefer: ModuleScript;
						keyboard: ModuleScript;
						gamepad: ModuleScript;
						mouse: ModuleScript;
						types: ModuleScript;
					};
				};
				beacon: Folder & {
					out: ModuleScript;
				};
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				maid: Folder & {
					Maid: ModuleScript;
				};
				sheetvalues: Folder & {
					src: ModuleScript & {
						SHA1: ModuleScript;
						TypeTransformer: ModuleScript;
					};
				};
				profileservice: Folder & {
					src: ModuleScript;
				};
				["viewport-model"]: Folder & {
					src: ModuleScript;
				};
				trove: Folder & {
					out: ModuleScript;
				};
				["object-utils"]: ModuleScript;
				signal: ModuleScript;
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
			};
			types: Folder;
			[".types-rXeBI2c3"]: Folder & {
				include: Folder & {
					generated: Folder;
				};
			};
			t: Folder;
			["compiler-types"]: Folder & {
				types: Folder;
			};
			[".formatnumber-SqbJ1GLO"]: Folder & {
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
			["viewport-model"]: Folder;
			services: ModuleScript;
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
			maid: Folder & {
				Maid: ModuleScript;
			};
			["object-utils"]: ModuleScript;
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
