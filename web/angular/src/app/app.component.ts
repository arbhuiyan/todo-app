import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService } from './task.service';
import { Task, TODO_STATE, COMPLETED_STATE } from './task';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from './dialog/create-task/create-task.component';
import { EditTaskComponent } from './dialog/edit-task/edit-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todo : Task[]= [];
  done : Task[] = [];

 constructor( private taskService: TaskService, private dialog: MatDialog ) {
  taskService.list()
  .subscribe( tasks => {
    tasks.forEach(t => {
      if ( t.state == TODO_STATE ) {
        this.todo.push(t);
      } else {
        this.done.push(t);
      }
    })
  });
 }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        const item: Task |any = event.previousContainer.data[event.previousIndex];
        if (item.state == TODO_STATE) {
          item.state = COMPLETED_STATE; 
        } else {
          item.state = TODO_STATE;
        }
        this.taskService.edit( item._id, item )
        .subscribe(
          (item) => {
            console.log(item);
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
        } 
      );     
    }
  }

  create() {
    this.dialog.open(CreateTaskComponent);
  }

  edit(task: Task): void {
    this.dialog.open(EditTaskComponent);
  }

  delete(taskId: string, source: Task[]): void {
    this.taskService.delete(taskId).subscribe(() => {
      source.forEach( (t, i) =>{
        if (t._id == taskId) {
          source.splice(i, 1);
        }
      })
    });
  }

}