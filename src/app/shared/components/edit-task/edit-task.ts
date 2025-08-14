import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskModel } from '../../models/task.model';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../core/services/task.service';
import { TaskForm } from '../task-form/task-form';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'tm-edit-task',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    TaskForm,
    MatSnackBarModule,
  ],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
})
export class EditTask {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly taskService = inject(TaskService);
  private _snackBar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<EditTask>);
  fb = inject(FormBuilder);
  today = new Date();

  handleTaskSaved(task: TaskModel) {
    if (!task.id) return;

    this.taskService.updateTask(task.id, task).subscribe({
      next: (updatedTask) => {
        this._snackBar.open('Task updated successfully', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(updatedTask);
      },
      error: (error) => {
        console.error('Erro ao atualizar task:', error);
      },
    });
  }
}
