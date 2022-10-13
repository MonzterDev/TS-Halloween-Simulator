import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Events } from "server/network";
import { reward } from "server/utils/Rewards";
import { Code, CODES, CODES_CONFIG } from "shared/constants/Codes";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class CodeService implements OnStart {
    private playerDataService = Dependency(PlayerDataService)

    onStart() {
        Events.redeemCode.connect((player, code) => this.redeemCode(player, code))
    }

    private redeemCode ( player: Player, code: Code ) {
        code = code.upper()
        const profile = this.playerDataService.getProfile( player )
        if (!profile) return

        const isCodeValid = CODES.includes( code.upper() )
        if ( !isCodeValid ) return

        const expirationTime = CODES_CONFIG[code].expiration
        if ( os.time() >= expirationTime ) return

        const isRedeemed = profile.data.codes.get( code )
        if ( isRedeemed ) return

        profile.data.codes.set( code, true )

        const rewards = CODES_CONFIG[code].reward
        reward( player, rewards )
        Events.redeemCode.fire(player, code)
    }
}