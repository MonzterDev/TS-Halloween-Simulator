import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Events } from "server/network";
import { getSettingAsProp, Setting } from "shared/constants/Settings";
import { PetsService } from "./PetsService";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class SettingsService implements OnInit {
    private playerDataService = Dependency( PlayerDataService )
    private petsService = Dependency(PetsService)

    onInit() {
        Events.toggleSetting.connect((player, setting) => this.updateSetting(player, setting))
    }

    private updateSetting ( player: Player, setting: Setting ) {
        const profile = this.playerDataService.getProfile( player )
        if ( !profile ) return

        const value = profile.data.settings[getSettingAsProp( setting )]
        profile.data.settings[getSettingAsProp( setting )] = !value
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