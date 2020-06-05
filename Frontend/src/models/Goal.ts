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
    goalId: string,
    description: string
}

export const ActionItemStatus: { [type: string]: number } = {
    Todo: 0,
    InProgress: 1,
    Complete: 2,
    Revisit: 3
}