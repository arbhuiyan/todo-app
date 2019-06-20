export interface Task {
 _id?: string,
 task: string,
 description: string,
 priority: number,
 state: string   
}

export const TODO_STATE = "todo";
export const COMPLETED_STATE = "completed";