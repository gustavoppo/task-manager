import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
import { TaskService } from '../../../core/services/task.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'tm-task-delete',
  imports: [
    MatDialogActions,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './task-delete.html',
  styleUrl: './task-delete.css',
})
export class TaskDelete {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly taskService = inject(TaskService);
  private _snackBar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<TaskDelete>);

  confirmDelete() {
    this.taskService.deleteTask(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this._snackBar.open('Task deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      error: () => this.dialogRef.close(false),
    });
  }
}
