export interface Goal {
    id: string,
    userId: string,
    goalType: number,
    dateTime: string
    goalTasks: Array<GoalTask>
}

export interface GoalTask {
    id: string;
    status: number,
    goalId: string,
}