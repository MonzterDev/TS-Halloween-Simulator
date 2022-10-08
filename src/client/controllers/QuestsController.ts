import { Controller, OnStart, OnInit } from "@flamework/core";
import { FormatCompact } from "@rbxts/format-number";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { Boosts } from "shared/constants/Boosts";
import { BoosterQuestRewardProps, getActiveQuestTier, Quest, QuestConfig, QuestRewardProps, Reward2 } from "shared/constants/Quests";
import { toTitleCase } from "shared/util/functions/toTileCase";

type Mode = "Active" | "Unclaimed" | "Completed"

@Controller({})
export class QuestsController implements OnInit {
    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private gui = <StarterGui["Quests"]>this.playerGui.WaitForChild( "Quests" )
    private frame = this.gui.Frame

    private buttons = this.frame.Buttons
    private container = this.frame.Container

    private template = this.container.Template

    private exit = this.frame.Exit
    private title = this.frame.Title

    private mode: Mode = "Active"

    onInit () {
        Events.updateQuestPoints.connect((quest, tier, points) => task.defer(() => this.updateQuestPoints(quest, tier, points)))
        Events.completeQuest.connect((quest, tier) => task.defer(() => this.changeMode(this.mode)))
        Events.claimQuest.connect((quest, tier) => task.defer(() => this.changeMode(this.mode)))
        this.buttons.ActiveQuests.MouseButton1Click.Connect(() => this.changeMode("Active"))
        this.buttons.Unclaimed.MouseButton1Click.Connect(() => this.changeMode("Unclaimed"))
        this.buttons.Completed.MouseButton1Click.Connect(() => this.changeMode("Completed"))
        this.changeMode("Active")
    }

    private updateQuestPoints ( quest: Quest, tier: number, points: number ) {
        if ( this.mode !== "Active" ) return
        const template = <typeof this.template>this.container.FindFirstChild( quest )
        if ( !template ) return

        const questConfig = QuestConfig[quest]
        const requiredPoints = questConfig.points_per_tier * tier

        const percent = (requiredPoints / points) / 10

        template.ProgressPercent.Text = `${percent}%`
        template.ProgressBar.CompletedProgressBar.Size = UDim2.fromScale(points / requiredPoints, 1)
    }

    private changeMode ( mode: Mode ) {
        this.cleanup()
        this.mode = mode

        if (mode === "Active") this.generateActiveQuests()
        else if (mode === "Unclaimed") this.generateUnclaimedQuests()
        else if (mode === "Completed") this.generateClaimedQuests()
    }

    private cleanup () {
        this.container.GetChildren().forEach( ( child ) => {
            if (child.IsA("TextButton") && child.Name !== "Template") child.Destroy()
        })
    }

    private generateActiveQuests () {
        for ( const [quest, props] of pairs( clientStore.getState().data.quests ) ) {
            const tier = getActiveQuestTier( props )
            const currentPoints = props[tier].points
            this.generateQuest(quest, tier, currentPoints)
        }
    }

    private generateUnclaimedQuests () {
        for ( const [quest, props] of pairs( clientStore.getState().data.quests ) ) {
            for ( const [tier, tierProps] of pairs( props ) ) {
                if ( !tierProps.claimed_reward && tierProps.completed ) this.generateQuest(quest, tier, tierProps.points)
            }
        }
    }

    private generateClaimedQuests () {
        for ( const [quest, props] of pairs( clientStore.getState().data.quests ) ) {
            for ( const [tier, tierProps] of pairs( props ) ) {
                if ( tierProps.claimed_reward ) this.generateQuest(quest, tier, tierProps.points, true)
            }
        }
    }

    private generateQuest (quest: Quest, tier: number, currentPoints: number, isClaimed: boolean = false) {
        const questConfig = QuestConfig[quest]
        const requiredPoints = questConfig.points_per_tier * tier
        const isCompleted = requiredPoints <= currentPoints

        const percent = math.floor((currentPoints / requiredPoints) * 100)

        const clone = this.template.Clone()
        clone.Parent = this.container
        clone.Visible = true
        clone.Name = quest
        clone.SetAttribute("tier", tier)
        clone.Quest.Text = `${quest} ${tier}`
        clone.ProgressPercent.Text = `${percent}%`
        clone.ProgressBar.CompletedProgressBar.Size = UDim2.fromScale(currentPoints / requiredPoints, 1)
        clone.Description.Text = questConfig.description.gsub( "REPLACE", requiredPoints )[0]
        clone.Rewards.Text = this.getRewardsToTextForm( questConfig.reward, tier )

        this.updateClaimButton(clone, isCompleted, isClaimed)
    }

    private updateClaimButton ( template: typeof this.template, completed: boolean, isClaimed: boolean ) {
        const button = template.Claim
        if ( !completed ) {
            button.TextTransparency = .5
            button.Background.ImageTransparency = .5
            button.Selectable = false
        } else if (completed && !isClaimed) {
            button.TextTransparency = 0
            button.Background.ImageTransparency = 0
            button.Selectable = true
            button.MouseButton1Click.Connect(() => Events.claimQuest.fire(template.Name, tonumber(template.GetAttribute("tier")!)!))
        } else if (isClaimed) button.Destroy()
    }

    private getRewardsToTextForm ( rewardProps: QuestRewardProps, tier: number ): string {
        let rewardString = ""

        for ( const [key, props] of pairs( rewardProps[tier] ) ) {
            const rewardType = <string>key
            const isABoost = Boosts.includes( <Boosts>rewardType )
            if ( isABoost ) {
                const boosterInfo = <BoosterQuestRewardProps> props
                rewardString = `${rewardString} ${boosterInfo.amount}x ${boosterInfo.rarity} ${rewardType} Booster`
            } else {
                const currencyAmount =  <number> props
                rewardString = `${rewardString} ${FormatCompact(currencyAmount)}x ${toTitleCase(rewardType)}`
            }
        }

        return rewardString
    }


}