export interface Goal {
    id: string,
    userId: string,
    goalType: number,
    date: string
    actionItems: ActionItem[]
}

export interface ActionItem {
    id: string;
    status: number,
    goalId: string
}