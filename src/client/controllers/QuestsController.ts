import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { FormatCompact } from "@rbxts/format-number";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { clientStore } from "client/rodux/rodux";
import { openGui, resetScrollingFrame } from "client/utils/openGui";
import { Boost, BOOSTS } from "shared/constants/Boosts";
import { BoosterQuestRewardProps, getActiveQuestTier, Quest, QUEST_CONFIG, QuestRewardProps, Reward2 } from "shared/constants/Quests";
import { cleanString } from "shared/util/functions/cleanString";
import { NotificationsController } from "./NotificationsController";

type Mode = "Active" | "Unclaimed" | "Completed"

@Controller({})
export class QuestsController implements OnStart {
    private notificationsController = Dependency(NotificationsController)

    private player = Players.LocalPlayer
    private playerGui = <PlayerGui>this.player.WaitForChild( "PlayerGui" )

    private buttonsGui = <StarterGui["Buttons"]>this.playerGui.WaitForChild( "Buttons" )
    private openButton = this.buttonsGui.Frame.Quests

    private gui = <StarterGui["Quests"]>this.playerGui.WaitForChild( "Quests" )
    private frame = this.gui.Frame

    private buttons = this.frame.Buttons
    private container = this.frame.Container

    private template = this.container.Template

    private exit = this.frame.Exit
    private title = this.frame.Title

    private mode: Mode = "Active"

    onStart () {
        Events.updateQuestPoints.connect((quest, tier, points) => task.defer(() => this.updateQuestPoints(quest, tier, points)))
        Events.completeQuest.connect( ( quest, tier ) => task.defer( () => {
            this.notificationsController.createNotification("Quest Completed: QUEST!", {quest: quest, tier: tier})
            this.changeMode( this.mode )
        } ) )
        Events.claimQuest.connect((quest, tier) => task.defer(() => this.changeMode(this.mode)))
        this.buttons.ActiveQuests.MouseButton1Click.Connect(() => this.changeMode("Active"))
        this.buttons.Unclaimed.MouseButton1Click.Connect(() => this.changeMode("Unclaimed"))
        this.buttons.Completed.MouseButton1Click.Connect(() => this.changeMode("Completed"))
        this.changeMode( "Active" )
        this.exit.MouseButton1Click.Connect( () => this.gui.Enabled = false )
        this.openButton.MouseButton1Click.Connect(() => openGui(this.gui))
    }

    private updateQuestPoints ( quest: Quest, tier: number, points: number ) {
        if ( this.mode !== "Active" ) return
        const template = <typeof this.template>this.container.FindFirstChild( quest )
        if ( !template ) return

        const questConfig = QUEST_CONFIG[quest]
        const requiredPoints = questConfig.points_per_tier * tier

        const percent = (points / requiredPoints) * 100

        template.ProgressPercent.Text = `${percent}%`
        template.ProgressBar.CompletedProgressBar.Size = UDim2.fromScale(points / requiredPoints, 1)
    }

    private changeMode ( mode: Mode ) {
        this.cleanup()
        this.mode = mode
        this.title.Text = `${mode} QUESTS`.upper()

        if (mode === "Active") this.generateActiveQuests()
        else if (mode === "Unclaimed") this.generateUnclaimedQuests()
        else if ( mode === "Completed" ) this.generateClaimedQuests()
        resetScrollingFrame(this.container)
    }

    private cleanup () {
        this.container.GetChildren().forEach( ( child ) => {
            if (child.IsA("TextButton") && child.Name !== "Template") child.Destroy()
        })
    }

    private generateActiveQuests () {
        for ( const [quest, props] of pairs( clientStore.getState().data.quests ) ) {
            const tier = getActiveQuestTier( props )
            if (!props[tier]) continue // Completed all tiers of that quest
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
        const questConfig = QUEST_CONFIG[quest]
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
        if ( !completed || isClaimed ) {
            button.TextTransparency = .5
            button.Background.ImageTransparency = .5
            button.Selectable = false
        } else if (completed && !isClaimed) {
            button.TextTransparency = 0
            button.Background.ImageTransparency = 0
            button.Selectable = true
            button.MouseButton1Click.Connect(() => Events.claimQuest.fire(template.Name, tonumber(template.GetAttribute("tier")!)!))
        }
    }

    private getRewardsToTextForm ( rewardProps: QuestRewardProps, tier: number ): string {
        let rewardString = ""

        for ( const [key, props] of pairs( rewardProps[tier] ) ) {
            const rewardType = <string>key
            const isABoost = BOOSTS.includes( <Boost>rewardType )
            if ( isABoost ) {
                const boosterInfo = <BoosterQuestRewardProps> props
                rewardString = `${rewardString} ${boosterInfo.amount}x ${boosterInfo.rarity} ${rewardType} Booster`
            } else {
                const currencyAmount =  <number> props
                rewardString = `${rewardString} ${FormatCompact(currencyAmount)}x ${cleanString(rewardType)}`
            }
        }

        return rewardString
    }


}