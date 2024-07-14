import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  showCompleted = false;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  toggleShowCompleted(): void {
   this.showCompleted = !this.showCompleted;
    if(this.showCompleted){
    this.filteredTasks = this.tasks.filter(task => task.completed);
    }else{
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    }
  }

  filterTasks(isDeleted:boolean = false): void {
    this.filteredTasks = this.tasks.filter(task => this.showCompleted || !task.completed);
    if(isDeleted)window.location.reload();
  }

  deleteTask(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(id);
        this.filterTasks(true);
      }
    });
  }
}
