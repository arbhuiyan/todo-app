import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/task.service';
import { Task, PRIORITIES, Priority } from 'src/app/task';

@Component({
  selector: 'app-create-or-update-form',
  templateUrl: './create-or-update-form.component.html',
  styleUrls: ['./create-or-update-form.component.scss']
})
export class CreateOrUpdateFormComponent implements OnInit {
  
  form: FormGroup;
  priorities: Priority[] = PRIORITIES;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<CreateOrUpdateFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CreateOrUpdateData
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      task: ["", [Validators.required]],
      description: ["", [Validators.required]],
      priority: [1, [Validators.required]],
    });
    if (this.data.hasOwnProperty("task")) {
      this.form.get("task").setValue(this.data.task.task);
      this.form.get("description").setValue(this.data.task.description);
      this.form.get("priority").setValue(this.data.task.priority);
    }
  }

  createOrUpdate() {
    if (this.data.type == TYPE_CREATE) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    const { task, description, priority } = this.form.value;
    const newTask : Task = { task, description, priority };
    this.taskService.add( newTask ).subscribe(t => {
      this.dialogRef.close(t);
    });
  }

  update() {
    const { task, description, priority } = this.form.value;
    const id = this.data.task.id;
    const editedTask: Task = { id, task, description, priority };
    this.taskService.edit( this.data.task.id, editedTask )
      .subscribe(t => {
        this.data.task.task = t.task;
        this.data.task.description = t.description;
        this.data.task.priority = t.priority;
        this.dialogRef.close();
      });
  }
}

export interface CreateOrUpdateData {
  task?: Task,
  type: string
}
export const TYPE_CREATE = "create";
export const TYPE_UPDATE = "update";