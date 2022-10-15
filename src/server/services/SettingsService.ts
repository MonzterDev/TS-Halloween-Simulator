import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Events } from "server/network";
import { Setting, SETTINGS } from "shared/constants/Settings";
import { PetsService } from "./PetsService";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class SettingsService implements OnStart {
    private playerDataService = Dependency( PlayerDataService )
    private petsService = Dependency(PetsService)

    onStart() {
        Events.toggleSetting.connect((player, setting) => this.updateSetting(player, setting))
    }

    private updateSetting ( player: Player, setting: Setting ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const value = profile.data.settings.get(setting)
        profile.data.settings.set(setting, !value)
        Events.toggleSetting.fire( player, setting, !value )
        this.performAction(player, setting, !value)
    }

    private performAction ( player: Player, setting: Setting, value: boolean ) {
        switch (setting) {
            case "Hide Others Pets":
                if (!value) this.petsService.getOthersPets(player)
                break;
        }
    }
}