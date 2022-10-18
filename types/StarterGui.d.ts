interface StarterGui extends BasePlayerGui {
	Inventory: ScreenGui & {
		Frame: Frame & {
			Exit: ImageButton;
			PetInventory: Frame & {
				Confirmation: Frame & {
					Confirm: ImageButton & {
						Text: TextLabel;
					};
					UIGridLayout: UIGridLayout;
					Cancel: ImageButton & {
						Text: TextLabel;
					};
				};
				Info: Frame & {
					Locked: ImageLabel;
					Buttons: Frame & {
						Equip: ImageButton & {
							Title: TextLabel;
						};
						UIGridLayout: UIGridLayout;
						Delete: ImageButton & {
							Title: TextLabel;
						};
						Lock: ImageButton & {
							Title: TextLabel;
						};
					};
					ViewportFrame: ViewportFrame & {
						UICorner: UICorner;
					};
					Background: ImageLabel;
					Equipped: ImageLabel;
					PetName: TextLabel;
				};
				Buttons: Frame & {
					UIGridLayout: UIGridLayout;
					Trash: ImageButton & {
						Text: TextLabel;
					};
					EquipBest: ImageButton & {
						Text: TextLabel;
					};
				};
				Stored: TextLabel;
				ContainerBackground: ImageLabel;
				Equipped: TextLabel;
				Container: ScrollingFrame & {
					Template: ImageButton & {
						IsSelected: ImageLabel;
						Power: TextLabel;
						Locked: ImageLabel;
						Background: ImageLabel;
						Equipped: ImageLabel;
						ViewportFrame: ViewportFrame;
					};
					UIGridLayout: UIGridLayout;
				};
			};
			Buttons: Frame & {
				Pets: ImageButton & {
					IconHolder: ImageLabel;
				};
				UIGridLayout: UIGridLayout;
				Boosts: ImageButton & {
					IconHolder: ImageLabel;
				};
			};
			Title: ImageLabel & {
				Title: TextLabel;
			};
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			BoostInventory: Frame & {
				ContainerBackground: ImageLabel;
				Info: Frame & {
					BoostName: TextLabel;
					Description: TextLabel;
					Background: ImageLabel;
					Boost: ImageLabel;
					Use: ImageButton & {
						Title: TextLabel;
					};
				};
				Container: ScrollingFrame & {
					Template: ImageButton & {
						Background: ImageLabel;
						Boost: ImageLabel;
						Amount: TextLabel;
					};
					UIGridLayout: UIGridLayout;
				};
			};
		};
	};
	GiftButton: ScreenGui & {
		Button: TextButton & {
			ProgressBar: ImageLabel & {
				CompletedProgressBar: ImageLabel;
			};
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
				IconHolder: ImageLabel;
				Amount: TextLabel;
			};
			CandyCornHolder: ImageLabel & {
				IconHolder: ImageLabel;
				Amount: TextLabel;
			};
			UIListLayout: UIListLayout;
			MoneyHolder: ImageLabel & {
				IconHolder: ImageLabel;
				Purchase: ImageButton;
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
			Exit: ImageButton;
			Title: ImageLabel & {
				Title: TextLabel;
			};
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Container: ScrollingFrame & {
				Template: ImageButton & {
					Toggle: ImageLabel & {
						On: ImageLabel;
						Off: ImageLabel;
					};
					Setting: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
	Codes: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Subtext: TextLabel;
			Title: ImageLabel & {
				Title: TextLabel;
			};
			Redeem: ImageButton & {
				Text: TextLabel;
			};
			TextBox: TextBox;
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			TextBoxBackground: ImageLabel;
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
			Exit: ImageButton;
			Title: ImageLabel & {
				Title: TextLabel;
			};
			Background: ImageLabel;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
			Container: ScrollingFrame & {
				Template: ImageButton & {
					Locked: ImageLabel;
					Area: TextLabel;
				};
				UIGridLayout: UIGridLayout;
			};
		};
	};
	Buttons: ScreenGui & {
		Frame: Frame & {
			Map: ImageButton & {
				Icon: ImageLabel;
			};
			MonetizationShop: ImageButton & {
				Icon: ImageLabel;
			};
			UIGridLayout: UIGridLayout;
			Settings: ImageButton & {
				Icon: ImageLabel;
			};
			Codes: ImageButton & {
				Icon: ImageLabel;
			};
			Inventory: ImageButton & {
				Icon: ImageLabel;
			};
			PetIndex: TextButton;
			Sell: TextButton;
			Quests: ImageButton & {
				Icon: ImageLabel;
			};
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
	ActiveBoosts: ScreenGui & {
		Frame: Frame & {
			Template: ImageLabel & {
				Duration: TextLabel;
			};
			UIGridLayout: UIGridLayout;
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
}
