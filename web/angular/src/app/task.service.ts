import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private baseUrl = environment.taskApiUrl;

  constructor(private http: HttpClient) { }

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + "/tasks").pipe( 
      map(tasks => {
      return tasks.map(t => {
        return new Task(t.task, t.description, t.priority, t.state, t[environment.taskIdentifier]);
      });
    }));
  }

  find(taskId : any): Observable <Task> {
    return this.http.get<Task>(this.baseUrl + "/tasks/" + taskId).pipe(
      map(t => new Task(t.task, t.description, t.priority, t.state, t[environment.taskIdentifier]))
    );
  }

  add(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + "/tasks", task).pipe(
      map(t => new Task(t.task, t.description, t.priority, t.state, t[environment.taskIdentifier]))
    );
  }

  edit(taskId: any, task: Task) {
    return this.http.put<Task>(this.baseUrl + "/tasks/" + taskId, task).pipe(
      map(t => new Task(t.task, t.description, t.priority, t.state, t[environment.taskIdentifier]))
    );
  }

  delete(taskId: any): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/tasks/" + taskId);
  }
}