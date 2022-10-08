type Quests = ScreenGui & {
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
}
