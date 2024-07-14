import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor(private localStorageService: LocalStorageService) {
    const storedTasks = this.localStorageService.getTasks();
    if (storedTasks) {
      this.tasks = storedTasks;
      this.nextId = Math.max(...this.tasks.map(task => task.id)) + 1;
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask(task: Task): void {
    task.id = this.nextId++;
    this.tasks.push(task);
    this.localStorageService.setTasks(this.tasks);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.localStorageService.setTasks(this.tasks);
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.localStorageService.setTasks(this.tasks);
  }
}
