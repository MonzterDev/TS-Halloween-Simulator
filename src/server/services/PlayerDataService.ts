import { OnStart, Service } from "@flamework/core";
import Make from "@rbxts/make";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import Signal from "@rbxts/signal";
import { Events, Functions } from "server/network";
import { Currency } from "shared/constants/Currencies";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";
import { Quest } from "shared/constants/Quests";
import { PlayerData } from "shared/types/PlayerData";
import { forEveryPlayer } from "shared/util/functions/forEveryPlayer";

const DATASTORE_NAME = "PlayerData";
const KEY_TEMPLATE = "%d_Data";

@Service()
export class PlayerDataService implements OnStart {
	private profileStore = ProfileService.GetProfileStore( DATASTORE_NAME, DEFAULT_PLAYER_DATA );
	private profiles = new Map<Player, Profile<PlayerData>>();

	public profileLoaded = new Signal<( player: Player, profile: Profile<PlayerData> ) => void>();

	onStart () {
		forEveryPlayer(
			player => this.createProfile( player ),
			player => this.removeProfile( player ),
		);

		Functions.getData.setCallback( ( player, data ) => {
			const profile = this.profiles.get( player );
			return profile?.Data?.[data] ?? false;
		} );

		Functions.getBasketUpgrade.setCallback( ( player, upgrade ) => {
			const profile = this.profiles.get( player );
			return profile?.Data?.basket_upgrades[upgrade] ?? 0;
		} )

		Functions.getAllData.setCallback( ( player ) => {
			return this.profiles.get( player )?.Data || false
		} )
	}

	private createLeaderstats (player: Player, data: PlayerData) {
		Make( "Folder", {
			Name: "leaderstats",
			Parent: player,
			Children: [
				Make( "NumberValue", {
					Name: "Candy",
					Value: data.candy
				} ),
				Make( "NumberValue", {
					Name: "Money",
					Value: data.money
				})
			]
		})
	}

	private createProfile ( player: Player ) {
		const userId = player.UserId;
		const profileKey = KEY_TEMPLATE.format( userId );
		const profile = this.profileStore.LoadProfileAsync( profileKey );

		if ( !profile ) return player.Kick();

		profile.ListenToRelease( () => {
			this.profiles.delete( player );
			player.Kick();
		} );

		profile.AddUserId( userId );
		profile.Reconcile();

		this.createLeaderstats(player, profile.Data)
		this.profiles.set( player, profile );
		this.profileLoaded.Fire( player, profile )
	}

	private removeProfile ( player: Player ) {
		const profile = this.profiles.get( player );
		profile?.Release();
	}

	public getProfile ( player: Player ) {
		const profile = this.profiles.get( player );

		if ( profile ) {

			const setCandy = ( value: number ) => {
				profile.Data.candy = value
				player.leaderstats.Candy.Value = value
				Events.updateCurrency.fire(player, "candy", value)
			}

			const adjustCandy = ( value: number ) => {
				const amount = profile.Data.candy + value
				setCandy( amount )
			}

			const setMoney = ( value: number ) => {
				profile.Data.money = value
				player.leaderstats.Money.Value = value
				Events.updateCurrency.fire(player, "money", value)
			}

			const adjustMoney = ( value: number ) => {
				const amount = profile.Data.money + value
				setMoney( amount )
			}

			const setCandyCorn = ( value: number ) => {
				profile.Data.candy_corn = value
				Events.updateCurrency.fire(player, "candy_corn", value)
			}

			const adjustCandyCorn = ( value: number ) => {
				const amount = profile.Data.candy_corn + value
				setMoney( amount )
			}

			const setQuestPoints = ( quest: Quest, tier: number, points: number ) => {
        		profile.Data.quests[quest][tier].points = points
				Events.updateQuestPoints.fire(player, quest, tier, points)
			}

			const adjustQuestPoints = ( quest: Quest, tier: number, points: number ) => {
				const amount = profile.Data.quests[quest][tier].points + points
				setQuestPoints(quest, tier, amount)
			}

			return {
				data: profile.Data,
				setCandy: setCandy,
				adjustCandy: adjustCandy,
				setMoney: setMoney,
				adjustMoney: adjustMoney,
				setCandyCorn: setCandyCorn,
				adjustCandyCorn: adjustCandyCorn,
				adjustQuestPoints: adjustQuestPoints,
				setQuestPoints: setQuestPoints,
			};
		}

		return false;
	}
}
