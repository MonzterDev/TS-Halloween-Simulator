import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "server/network";
import { reward } from "server/utils/Rewards";
import { Boosts } from "shared/constants/Boosts";
import { GiftConfig, GiftTime } from "shared/constants/Gifts";
import { DEFAULT_GIFTS_DATA } from "shared/constants/PlayerData";
import { BoosterQuestRewardProps } from "shared/constants/Quests";
import { BoostsService } from "./BoostsService";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class GiftsService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)
    private boostsService = Dependency(BoostsService)

    onInit() {
        task.spawn( () => this.trackPlaytime() )
        Events.claimGift.connect((player, gift) => this.claimGift(player, gift))
    }

    private claimGift ( player: Player, gift: GiftTime ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const secondsPlayed = profile.data.gift_time_played
        const isUnlocked = secondsPlayed >= (gift * 60)
        const isClaimed = profile.data.gifts[gift]

        if ( isClaimed || !isUnlocked ) return

        const rewards = GiftConfig[gift]
        reward( player, rewards )

        profile.data.gifts[gift] = true
        Events.claimGift.fire(player, gift)
    }

    private resetGifts ( player: Player ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const oneDayLater = os.time() + 86400
        profile.data.gift_reset_time = oneDayLater
        profile.data.gift_time_played = 0
        profile.data.gifts = DEFAULT_GIFTS_DATA

        Events.updateGiftPlayDuration.fire(player, 0)
        Events.updateGiftResetTime.fire(player, oneDayLater)
        Events.resetGifts.fire(player)
    }

    private trackPlaytime () {
        while ( true ) {
            Players.GetPlayers().forEach( ( player ) => {
                const profile = this.playerDataService.getProfile( player )
                if ( !profile ) return

                const resetTime = profile.data.gift_reset_time
                if ( os.time() >= resetTime ) {
                    this.resetGifts( player )
                    return
                }

                profile.data.gift_time_played += 1
                Events.updateGiftPlayDuration.fire(player, profile.data.gift_time_played)
            } )
            task.wait(1)
        }
    }

}