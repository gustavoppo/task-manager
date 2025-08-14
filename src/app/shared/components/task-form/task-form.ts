import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../core/services/task.service';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'tm-task-form',
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
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  @Input() taskToEdit: TaskModel | null = null;
  @Output() saved = new EventEmitter<TaskModel>();

  dialogRef = inject(MatDialogRef<TaskForm>);
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  today = new Date();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    dueDate: [this.today, Validators.required],
    status: ['Pending', Validators.required],
    priority: ['Low', Validators.required],
  });

  ngOnInit() {
    if (this.taskToEdit) {
      this.form.patchValue({
        ...this.taskToEdit,
        dueDate: new Date(this.taskToEdit.dueDate),
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const taskData: TaskModel = {
      id: this.taskToEdit?.id,
      title: formValue.title!,
      description: formValue.description!,
      status: formValue.status!,
      dueDate: formValue.dueDate?.toISOString() || new Date().toISOString(),
      priority: formValue.priority!,
    };

    this.saved.emit(taskData);
  }

  cancel() {
    this.form.reset();
    this.dialogRef.close(false);
  }
}
