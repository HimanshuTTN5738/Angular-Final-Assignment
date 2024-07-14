import { Injectable } from '@angular/core';
import { Task } from './tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly storageKey = 'tasks';

  getTasks(): Task[] | null {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : null;
  }

  setTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
