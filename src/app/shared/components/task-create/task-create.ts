import { Component, inject } from '@angular/core';
import { TaskForm } from '../task-form/task-form';
import { TaskModel } from '../../models/task.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../core/services/task.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'tm-task-create',
  imports: [TaskForm, MatDialogModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './task-create.html',
  styleUrl: './task-create.css',
})
export class TaskCreate {
  readonly dialog = inject(MatDialog);
  readonly taskService = inject(TaskService);
  private _snackBar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<TaskForm>);

  handleTaskSaved(task: TaskModel) {
    this.taskService.createTask(task).subscribe({
      next: (createdTask) => {
        this._snackBar.open('Task created successfully', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(createdTask);
      },
      error: (error) => {
        this._snackBar.open('Error creating task', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
