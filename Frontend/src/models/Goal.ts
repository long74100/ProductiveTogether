export interface Goal {
    id: string,
    userId: string,
    goalType: number,
    dateTime: string
    goalTasks: GoalTask[]
}

export interface GoalTask {
    id: string;
    status: number,
    goalId: string,
}