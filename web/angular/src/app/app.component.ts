import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray,transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateFormComponent, TYPE_CREATE, TYPE_UPDATE } from './create-or-update-form/create-or-update-form.component';
import { TaskService } from './task.service';
import { Task, TODO_STATE, COMPLETED_STATE } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todo : Task[] = [];
  done : Task[] = [];

  constructor( private taskService: TaskService, private dialog: MatDialog ) {}

  ngOnInit(): void {
    this.taskService.list()
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
        this.taskService.edit( item.id, item )
        .subscribe(
          (item) => {
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
        } 
      );     
    }
  }

  create() {
    this.dialog.open(CreateOrUpdateFormComponent, {
      data: { type: TYPE_CREATE }
    }).afterClosed().subscribe(
      (t) => {  
        if ( t instanceof Task ) {
          this.todo.push(t);
        }
    });
  }

  edit(task: Task): void {
    this.dialog.open(CreateOrUpdateFormComponent, {
      data: {
        task: task,
        type: TYPE_UPDATE
      }
    });
  }

  delete(task: Task, source: Task[]): void {
    this.taskService.delete(task.id).subscribe(() => {
      source.forEach( (t, i) =>{
        if (t.id == task.id) {
          source.splice(i, 1);
        }
      })
    });
  }

}