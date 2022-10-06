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
