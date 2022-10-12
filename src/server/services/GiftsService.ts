import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Profile } from "@rbxts/profileservice/globals";
import { Events } from "server/network";
import { DEFAULT_GIFTS_DATA } from "shared/constants/PlayerData";
import { PlayerData } from "shared/types/PlayerData";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class GiftsService implements OnInit {
    private playerDataService = Dependency(PlayerDataService)

    onInit() {
        this.playerDataService.profileLoaded.Connect((player, profile) => this.test(player, profile))
    }

    private resetGifts ( player: Player, profile: Profile<PlayerData> ) {
        const oneDayLater = os.time() + 86400
        profile.Data.gift_reset_time = oneDayLater
        profile.Data.gift_time_played = 0
        profile.Data.gifts = DEFAULT_GIFTS_DATA

        Events.updateGiftPlayDuration.fire(player, 0)
        Events.updateGiftResetTime.fire(player, oneDayLater)
        Events.resetGifts.fire(player)
    }

    private test ( player: Player, profile: Profile<PlayerData> ) {
        const resetTime = profile.Data.gift_reset_time
        if (os.time() >= resetTime) this.resetGifts(player, profile)
    }

}