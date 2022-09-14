import { OnInit, Service } from "@flamework/core";
import Make from "@rbxts/make";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Functions } from "server/network";
import { DEFAULT_PLAYER_DATA } from "shared/constants";
import { PlayerData } from "shared/types/PlayerData";
import { forEveryPlayer } from "shared/util/functions/forEveryPlayer";

const DATASTORE_NAME = "PlayerData";
const KEY_TEMPLATE = "%d_Data";

@Service()
export class PlayerDataService implements OnInit {
	private profileStore = ProfileService.GetProfileStore( DATASTORE_NAME, DEFAULT_PLAYER_DATA );
	private profiles = new Map<Player, Profile<PlayerData>>();

	onInit () {
		forEveryPlayer(
			player => this.createProfile( player ),
			player => this.removeProfile( player ),
		);

		Functions.getData.setCallback( ( player, data ) => {
			const profile = this.profiles.get( player );

			return profile?.Data?.[data] ?? false;
		} );
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
	}

	private removeProfile ( player: Player ) {
		const profile = this.profiles.get( player );
		profile?.Release();
	}

	public getProfile ( player: Player ) {
		const profile = this.profiles.get( player );

		if ( profile ) {

			/** Set the value directly (Adjust should be used for increase / decreasing) */
			const setCandy = ( value: number ) => {
				profile.Data.candy = value
				player.leaderstats.Candy.Value = value
				// Events.modifiedTaps( player, value )
			}

			/** Increases / Decreases current number */
			const adjustCandy = ( value: number ) => {
				const amount = profile.Data.candy + value
				setCandy( amount )
			}

			/** Set the value directly (Adjust should be used for increase / decreasing) */
			const setMoney = ( value: number ) => {
				profile.Data.money = value
				// Events.modifiedTaps( player, value )
			}

			/** Increases / Decreases current number */
			const adjustMoney = ( value: number ) => {
				const amount = profile.Data.money + value
				setMoney( amount )
			}

			return {
				data: profile.Data,
				setCandy: setCandy,
				adjustCandy: adjustCandy,
				setMoney: setMoney,
				adjustMoney: adjustMoney,
			};
		}

		return false;
	}
}
