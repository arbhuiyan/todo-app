import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/task';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<CreateTaskComponent>) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      task: ["", [Validators.required]],
      description: ["", [Validators.required]],
      priority: [1],
    });
  }

  save() {
    const { task, description, priority } = this.createForm.value;
    const newTask : Task = { task, description, priority };
    this.taskService.add( newTask ).subscribe(t => {
      this.dialogRef.close(t);
    });
  }
}
