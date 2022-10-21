import { GameAnalytics } from "@rbxts/gameanalytics";
import { Service, OnStart } from "@flamework/core";

@Service({})
export class AnalyticsService implements OnStart {

    onStart() {
        GameAnalytics.initialize( {
            gameKey: "3dcceab8c6205f05f74c1b4a44870007",
            secretKey: "008baf6dc5fb16aa5ed9cfb8e9b9be4c07a17643",
            availableResourceCurrencies: ["USD"],
            availableResourceItemTypes: ["DevProduct", "Gamepass", "Candy", "Money"],
            availableGamepasses: [
                94737491, 94737363,
                88116412, 88116438,
                94738610, 94738652,
                88116485, 94738209, 94738011,
                95862472
            ],
        } )

        GameAnalytics.setEnabledAutomaticSendBusinessEvents(false)
    }
}
