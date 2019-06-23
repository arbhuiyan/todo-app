import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task, TODO_STATE } from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const tasks: Task[] = [
            {
                id: 1,
                task: "Task 1",
                description: "Priority 1 example",
                priority: 1,
                state: TODO_STATE
            },
            {
                id: 2,
                task: "Task 2",
                description: "Priority 2 example",
                priority: 2,
                state: TODO_STATE
            },
            {
                id: 3,
                task: "Task 3",
                description: "Priority 3 example",
                priority: 3,
                state: TODO_STATE
            }
        ];
        return {tasks};
    }

    genId(tasks: Task[]): number {
        return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
    }
}
