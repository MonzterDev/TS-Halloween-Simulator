interface StarterGui extends BasePlayerGui {
	Inventory: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Title: TextLabel;
			Buttons: Frame & {
				Pets: TextButton;
				UIGridLayout: UIGridLayout;
				Boosts: TextButton;
			};
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
	};
	GiftButton: ScreenGui & {
		Button: TextButton & {
			ProgressBar: ImageLabel & {
				CompletedProgressBar: ImageLabel;
			};
		};
	};
	PetInventory: ScreenGui & {
		Frame: Frame & {
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Warning: TextLabel;
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
			Stored: TextLabel;
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
	AreaPurchase: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Buy: TextButton;
			Title: TextLabel;
			Icon: ImageLabel;
			Price: TextLabel;
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Area: TextLabel;
		};
	};
	PetEgg: Folder & {
		InteractGui: BillboardGui & {
			Auto: ProximityPrompt;
			Hatch: ProximityPrompt;
			Container: Frame & {
				Auto: TextButton & {
					UICorner: UICorner;
					Frame: Frame & {
						KeyToPressMobile: ImageLabel;
						KeyToPress: TextLabel;
						UICorner: UICorner;
					};
					Action: TextLabel;
				};
				UIGridLayout: UIGridLayout;
				UIPadding: UIPadding;
				Hatch: TextButton & {
					UICorner: UICorner;
					Frame: Frame & {
						KeyToPressMobile: ImageLabel;
						KeyToPress: TextLabel;
						UICorner: UICorner;
					};
					Action: TextLabel;
				};
			};
		};
		InfoGui: BillboardGui & {
			Background: Frame & {
				Frame: Frame & {
					Pity: ImageLabel & {
						Title: TextLabel;
						Bar: ImageLabel;
					};
					Title: TextLabel;
					Container: Frame & {
						UIGridLayout: UIGridLayout;
						UIPadding: UIPadding;
						Template: TextButton & {
							UICorner: UICorner;
							Delete: TextLabel;
							ViewportFrame: ViewportFrame & {
								UICorner: UICorner;
							};
							Chance: TextLabel;
						};
					};
				};
			};
		};
		Animation: ScreenGui & {
			Frame: Frame & {
				UIGridLayout: UIGridLayout;
				Template: ViewportFrame & {
					Pet: TextLabel;
					Delete: TextLabel;
				};
				UIAspectRatioConstraint: UIAspectRatioConstraint;
			};
		};
	};
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
	Codes: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Title: TextLabel;
			Redeem: TextButton;
			TextBox: TextBox;
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Subtext: TextLabel;
		};
	};
	PetIndex: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Title: TextLabel;
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Container: ScrollingFrame & {
				Template: Frame & {
					Egg: ViewportFrame & {
						Amount: TextLabel;
					};
					Container: Frame & {
						Template: TextLabel & {
							ViewportFrame: ViewportFrame & {
								Title: TextLabel;
								Locked: TextLabel;
							};
						};
						UIGridLayout: UIGridLayout;
					};
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
	Map: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Background: ImageLabel;
			Title: TextLabel;
			Container: ScrollingFrame & {
				Template: TextButton & {
					Background: ImageLabel;
					Area: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
	ActiveBoosts: ScreenGui & {
		Frame: Frame & {
			Template: ImageLabel & {
				Duration: TextLabel;
			};
			UIGridLayout: UIGridLayout;
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
	AreaWalls: Folder & {
		AreaDisplay: BillboardGui & {
			Price: TextLabel & {
				UIStroke: UIStroke;
			};
			Icon: ImageLabel;
			Area: TextLabel;
		};
	};
	MonetizationShop: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Currency: ScrollingFrame & {
				Template: TextButton & {
					Price: TextLabel;
					Background: ImageLabel;
					Icon: ImageLabel;
					Amount: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
			Title: TextLabel;
			Buttons: Frame & {
				Gamepasses: TextButton & {
					Background: ImageLabel;
				};
				UIGridLayout: UIGridLayout;
				Boosts: TextButton & {
					Background: ImageLabel;
				};
				Currency: TextButton & {
					Background: ImageLabel;
				};
			};
			Gamepasses: ScrollingFrame & {
				Template: TextButton & {
					Title: TextLabel;
					Price: TextLabel;
					Background: ImageLabel;
					Icon: ImageLabel;
					Description: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Boosts: ScrollingFrame & {
				Template: TextButton & {
					Price: TextLabel;
					Background: ImageLabel;
					Icon: ImageLabel;
					Description: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
	Buttons: ScreenGui & {
		Frame: Frame & {
			Map: TextButton;
			MonetizationShop: TextButton;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			UIGridLayout: UIGridLayout;
			Settings: TextButton;
			Codes: TextButton;
			PetIndex: TextButton;
			Sell: TextButton;
			Quests: TextButton;
			Inventory: TextButton;
		};
	};
	Notifications: ScreenGui & {
		Container: Frame & {
			UIGridLayout: UIGridLayout;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Template: Frame & {
				Message: TextLabel;
				UICorner: UICorner;
			};
		};
	};
	Gifts: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Title: TextLabel;
			Reset: TextLabel;
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Container: Frame & {
				Template: TextButton & {
					Claimed: ImageLabel;
					ProgressBar: ImageLabel & {
						Bar: ImageLabel;
					};
					Time: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
	Quests: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Title: TextLabel;
			Buttons: Frame & {
				Completed: TextButton & {
					Background: ImageLabel;
				};
				UIGridLayout: UIGridLayout;
				ActiveQuests: TextButton & {
					Background: ImageLabel;
				};
				Unclaimed: TextButton & {
					Background: ImageLabel;
				};
			};
			Background: ImageLabel;
			Container: ScrollingFrame & {
				Template: TextButton & {
					ProgressBar: ImageLabel & {
						CompletedProgressBar: ImageLabel;
					};
					Description: TextLabel;
					Claim: TextButton & {
						Background: ImageLabel;
					};
					Background: ImageLabel;
					Rewards: TextLabel;
					Quest: TextLabel;
					ProgressPercent: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
	BoostInventory: ScreenGui & {
		Frame: Frame & {
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Info: Frame & {
				Description: TextLabel;
				Boost: ImageLabel;
				BoostName: TextLabel;
				Use: TextButton;
			};
			Container: ScrollingFrame & {
				Template: ImageButton & {
					Boost: ImageLabel;
					Amount: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
}
