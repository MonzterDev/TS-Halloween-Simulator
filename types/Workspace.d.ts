interface Workspace extends Model {
	Pets: Folder;
	Camera: Camera;
	Baseplate: Part & {
		Texture: Texture;
	};
	Areas: Folder & {
		Crystal_Valley: Folder & {
			Wall: Part & {
				Display: Attachment;
				Block: Part;
			};
			Sell: Part;
			Spawn: Part;
		};
		Camp: Folder & {
			Shop: Part;
			Wall: Part & {
				Display: Attachment;
				Block: Part;
			};
			Sell: Part;
			Spawn: SpawnLocation;
			Area: Part;
		};
		Swamp: Folder & {
			Wall: Part & {
				Display: Attachment;
				Block: Part;
			};
			Sell: Part;
			Spawn: Part;
		};
		Spawn: Folder & {
			Shop: Part;
			Sell: Part;
			Spawn: SpawnLocation;
			Area: Part;
		};
	};
	Map: Folder & {
		Dummy: Model & {
			LeftLowerArm: MeshPart & {
				LeftElbowRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				LeftElbow: Motor6D;
				OriginalSize: Vector3Value;
				LeftWristRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
			};
			LeftFoot: MeshPart & {
				OriginalSize: Vector3Value;
				LeftAnkleRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				LeftAnkle: Motor6D;
			};
			RightHand: MeshPart & {
				RightWristRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				RightWrist: Motor6D;
				RightGripAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				OriginalSize: Vector3Value;
			};
			HumanoidRootPart: Part & {
				RootRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				OriginalSize: Vector3Value;
			};
			RightLowerLeg: MeshPart & {
				RightKneeRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				RightAnkleRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				RightKnee: Motor6D;
				OriginalSize: Vector3Value;
			};
			LeftUpperLeg: MeshPart & {
				OriginalSize: Vector3Value;
				LeftHip: Motor6D;
				LeftHipRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				LeftKneeRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
			};
			LeftLowerLeg: MeshPart & {
				OriginalSize: Vector3Value;
				LeftKnee: Motor6D;
				LeftAnkleRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				LeftKneeRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
			};
			LowerTorso: MeshPart & {
				WaistCenterAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				LeftHipRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				Root: Motor6D;
				RootRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				RightHipRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				OriginalSize: Vector3Value;
				WaistRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				WaistBackAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				WaistFrontAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
			};
			Head: Part & {
				HatAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				OriginalSize: Vector3Value;
				NeckRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				FaceFrontAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				HairAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				Neck: Motor6D;
				Mesh: SpecialMesh;
				FaceCenterAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
			};
			UpperTorso: MeshPart & {
				RightCollarAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				BodyBackAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				NeckRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				LeftCollarAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				OriginalSize: Vector3Value;
				Waist: Motor6D;
				RightShoulderRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				BodyFrontAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				WaistRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				LeftShoulderRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				NeckAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
			};
			LeftUpperArm: MeshPart & {
				LeftShoulderRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				LeftShoulder: Motor6D;
				LeftShoulderAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				LeftElbowRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				OriginalSize: Vector3Value;
			};
			RightLowerArm: MeshPart & {
				RightWristRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				OriginalSize: Vector3Value;
				RightElbow: Motor6D;
				RightElbowRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
			};
			LeftHand: MeshPart & {
				LeftWrist: Motor6D;
				LeftGripAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				OriginalSize: Vector3Value;
				LeftWristRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
			};
			Humanoid: Humanoid;
			RightUpperArm: MeshPart & {
				OriginalSize: Vector3Value;
				RightElbowRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				RightShoulderRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				RightShoulderAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				RightShoulder: Motor6D;
			};
			RightUpperLeg: MeshPart & {
				RightKneeRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				OriginalSize: Vector3Value;
				RightHip: Motor6D;
				RightHipRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
			};
			RightFoot: MeshPart & {
				RightAnkleRigAttachment: Attachment & {
					OriginalPosition: Vector3Value;
				};
				RightAnkle: Motor6D;
				OriginalSize: Vector3Value;
			};
		};
		Water: Model & {
			Layer3: MeshPart & {
				TextureBottom: Texture;
				TextureLeft: Texture;
				TextureFront: Texture;
				TextureBack: Texture;
				TextureRight: Texture;
				TextureTop: Texture;
			};
			Layer2: MeshPart;
			Layer4: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
			Layer1: MeshPart;
		};
		["Meshes/ocean cliff 2"]: MeshPart;
	};
	Piles: Folder & {
		Camp: Folder & {
			Large: Part;
			Medium: Part;
		};
		Swamp: Folder & {
			Large: Part;
			Medium: Part;
		};
		Spawn: Folder & {
			Large: Part;
			Medium: Part;
		};
	};
	Eggs: Folder & {
		Starter: Part & {
			Info: Attachment;
			Interact: Attachment;
		};
	};
}
