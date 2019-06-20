import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private baseUrl = environment.taskApiUrl;

  constructor(private http: HttpClient) { }

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + "/tasks");
  }

  find(taskId : string): Observable <Task> {
    return this.http.get<Task>(this.baseUrl + "/tasks/" + taskId);
  }

  add(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + "/tasks", task);
  }

  edit(taskId: string, task: Task) {
    return this.http.put<Task>(this.baseUrl + "/tasks/" + taskId, task);
  }

  delete(taskId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/tasks/" + taskId);
  }
}