export interface Task {
 _id?: string,
 task: string,
 description: string,
 priority: number,
 state?: string   
}
export interface Priority {
    name: string,
    value: number
}
export const TODO_STATE: string = "todo";
export const COMPLETED_STATE: string = "completed";
export const PRIORITIES: Priority[] = [{name:"Normal", value: 1}, {name:"Medium", value: 2}, {name:"High", value: 3}];