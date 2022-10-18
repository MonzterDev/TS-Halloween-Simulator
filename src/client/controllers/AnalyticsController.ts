import { Controller, OnStart, OnInit } from "@flamework/core";
import { initializeClient } from "@rbxts/gameanalytics";

@Controller({})
export class AnalyticsController implements OnStart {

    onStart() {
        initializeClient()
    }
}