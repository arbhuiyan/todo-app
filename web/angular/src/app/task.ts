
export class Task {
    constructor(
        public task: string,
        public description: string,
        public priority: number,
        public state?: string,
        public id?: any, ) 
    {}
}

export interface Priority {
    name: string,
    value: number
}
export const TODO_STATE: string = "todo";
export const COMPLETED_STATE: string = "completed";
export const PRIORITIES: Priority[] = [{name:"Normal", value: 1}, {name:"Medium", value: 2}, {name:"High", value: 3}];