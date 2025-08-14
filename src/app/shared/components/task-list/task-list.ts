import { DatePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../../core/services/task.service';
import { TaskModel } from '../../models/task.model';
import { EditTask } from '../edit-task/edit-task';
import { TaskDelete } from '../task-delete/task-delete';

@Component({
  selector: 'tm-task-list',
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    NgClass,
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskList implements OnInit {
  dialog = inject(MatDialog);
  taskService = inject(TaskService);
  cdr = inject(ChangeDetectorRef);
  tasks = this.taskService.tasks;

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  openDialog(task: TaskModel) {
    this.dialog.open(EditTask, {
      data: task,
      width: '500px',
    });
  }

  toggleStatus(task: TaskModel) {
    const updatedTask: TaskModel = {
      ...task,
      status: task.status === 'Pending' ? 'Finished' : 'Pending',
    };

    this.taskService.updateTask(task.id!, updatedTask).subscribe();
  }

  deleteTask(task: TaskModel) {
    this.dialog.open(TaskDelete, {
      data: task,
      width: '400px',
    });
  }
}
