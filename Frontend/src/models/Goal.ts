export interface Goal {
    id: string,
    userId: string,
    goalType: number,
    date: string
    goalTasks: GoalTask[]
}

export interface GoalTask {
    id: string;
    status: number,
    goalId: string
}