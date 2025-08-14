import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TaskModel } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  http = inject(HttpClient);
  tasks = signal<TaskModel[]>([]);

  loadTasks() {
    this.http
      .get<TaskModel[]>(this.apiUrl)
      .subscribe((res) => this.tasks.set(res));
  }

  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.apiUrl);
  }

  getTask(id: number): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.apiUrl}/${id}`);
  }

  createTask(task: TaskModel) {
    return this.http
      .post<TaskModel>(this.apiUrl, task)
      .pipe(tap((newTask) => this.tasks.update((list) => [...list, newTask])));
  }

  updateTask(id: number, task: TaskModel): Observable<TaskModel> {
    return this.http
      .put<TaskModel>(`${this.apiUrl}/${id}`, task)
      .pipe(
        tap((updated) =>
          this.tasks.update((list) =>
            list.map((t) => (t.id === updated.id ? updated : t))
          )
        )
      );
  }

  deleteTask(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.tasks.update((list) => list.filter((t) => t.id !== id)))
      );
  }
}
