import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TaskCreate } from '../../shared/components/task-create/task-create';
import { TaskList } from '../../shared/components/task-list/task-list';
@Component({
  selector: 'app-tasks',
  imports: [
    TaskList,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  dialog = inject(MatDialog);

  createTask() {
    this.dialog.open(TaskCreate, {
      width: '500px',
    });
  }
}
