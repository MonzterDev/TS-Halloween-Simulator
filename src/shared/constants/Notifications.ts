export const NOTIFICATIONS = [
    "You don't have enough money!",
    "Your Pet Storage is Full!",
    "You have fully upgraded this!",
    "Join our Group to receive rewards!",
    "You cannot equip more Pets!",
    "That code is invalid!",
    "That code is expired!",
    "You already redeemed this code!",
    "You moved, auto hatching stopped!",

    "+AMOUNT RARITY TYPE Booster!",
    "You purchased GAMEPASS, enjoy!",

    "Quest Completed: QUEST!",
    "You have a new Gift to claim!",
    "Code redeemed successfully!",
] as const
export type Notification = typeof NOTIFICATIONS[number]

export const NOTIFICATION_TYPES = ["Error", "Success", "Reward"] as const
export type NotificationType = typeof NOTIFICATION_TYPES[number]

export interface NotificationProps {
    type: NotificationType
}

export type NotificationConfig = Record<Notification, NotificationProps>

export const NOTIFICATION_CONFIG: NotificationConfig = {
    "You don't have enough money!": {
        type: "Error"
    },
    "Your Pet Storage is Full!": {
        type: "Error"
    },
    "You have fully upgraded this!": {
        type: "Error"
    },
    "Join our Group to receive rewards!": {
        type: "Error"
    },
    "You cannot equip more Pets!": {
        type: "Error"
    },
    "That code is invalid!": {
        type: "Error"
    },
    "That code is expired!": {
        type: "Error"
    },
    "You already redeemed this code!": {
        type: "Error"
    },
    "You moved, auto hatching stopped!": {
        type: "Error"
    },

    "+AMOUNT RARITY TYPE Booster!": {
        type: "Reward"
    },
    "You purchased GAMEPASS, enjoy!": {
        type: "Reward"
    },

    "Quest Completed: QUEST!": {
        type: "Success"
    },
    "You have a new Gift to claim!": {
        type: "Success"
    },
    "Code redeemed successfully!": {
        type: "Success"
    },
}

export const NOTIFICATION_COLORS: Record<NotificationType, Color3> = {
    Error: Color3.fromRGB( 255, 0, 0 ),
    Success: Color3.fromRGB( 0, 255, 0 ),
    Reward: Color3.fromRGB( 250, 255, 0 )
}
