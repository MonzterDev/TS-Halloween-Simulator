interface StarterGui extends BasePlayerGui {
	Currency: ScreenGui & {
		Frame: Frame & {
			CandyHolder: ImageLabel & {
				Icon: ImageLabel;
				Amount: TextLabel;
			};
			CandyCornHolder: ImageLabel & {
				Icon: ImageLabel;
				Amount: TextLabel;
			};
			UIListLayout: UIListLayout;
			MoneyHolder: ImageLabel & {
				Icon: ImageLabel;
				Amount: TextLabel;
			};
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Full: Frame & {
			Tip: TextLabel;
			Title: TextLabel;
			Upgrade: TextButton;
			UICorner: UICorner;
			Sell: TextButton;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Popup: Frame & {
			Template: Frame & {
				Icon: ImageLabel;
				UICorner: UICorner;
			};
		};
	};
	PetInventory: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Warning: TextLabel;
			Buttons: Frame & {
				UIGridLayout: UIGridLayout;
				Trash: TextButton;
				EquipBest: TextButton;
			};
			Confirmation: Frame & {
				Confirm: TextButton;
				UIGridLayout: UIGridLayout;
				Cancel: TextButton;
			};
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Info: Frame & {
				Locked: ImageLabel;
				Buttons: Frame & {
					Equip: TextButton;
					UIGridLayout: UIGridLayout;
					Delete: TextButton;
					Lock: TextButton;
				};
				Power: TextLabel;
				ViewportFrame: ViewportFrame;
				Temp: TextLabel;
				Equipped: ImageLabel;
				PetName: TextLabel;
			};
			Title: TextLabel;
			Stored: TextLabel;
			Background: ImageLabel;
			Equipped: TextLabel;
			Container: ScrollingFrame & {
				Template: ImageButton & {
					Power: TextLabel;
					Locked: ImageLabel;
					IsSelected: ImageLabel;
					Equipped: ImageLabel;
					ViewportFrame: ViewportFrame;
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
	Buttons: ScreenGui & {
		Frame: Frame & {
			UIGridLayout: UIGridLayout;
			Settings: TextButton;
			Sell: TextButton;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Pet: TextButton;
		};
	};
	BasketUpgrade: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Title: TextLabel;
			Upgrades: Frame & {
				Template: ImageButton & {
					Level: TextLabel;
					Upgrade: TextLabel;
					Bar: ImageLabel & {
						Progress: ImageLabel;
					};
				};
				UIGridLayout: UIGridLayout;
			};
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Info: Frame & {
				Price: TextLabel;
				Buy: TextButton;
				Description: TextLabel;
				Upgrade: TextLabel;
			};
		};
	};
	Monetization: ScreenGui & {
		Frame: Frame & {
			Message: TextLabel;
			UIGradient: UIGradient;
			UICorner: UICorner;
			UIStroke: UIStroke;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
	};
	Settings: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Warning: TextLabel;
			Title: TextLabel;
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Container: Frame & {
				Template: ImageButton & {
					Toggle: ImageLabel;
					Setting: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
}
