import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/task.service';
import { Task, PRIORITIES, Priority } from 'src/app/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  
  editForm: FormGroup;
  priorities: Priority[] = PRIORITIES;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private task: Task
    ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      task: [this.task.task, [Validators.required]],
      description: [this.task.description, [Validators.required]],
      priority: [this.task.priority, [Validators.required]],
    });
  }

  update() {
    const { task, description, priority } = this.editForm.value;
    const editedTask : Task = { task, description, priority };
    this.taskService.edit( this.task._id, editedTask )
      .subscribe(t => {
        this.task.task = t.task;
        this.task.description = t.description;
        this.task.priority = t.priority;
        this.dialogRef.close();
      });
  }

}
