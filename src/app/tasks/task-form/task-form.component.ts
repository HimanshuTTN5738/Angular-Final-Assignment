import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  task: Task | undefined;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      name: [''],
      dueDate: [''],
      priority: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.task = this.taskService.getTask(+id);
      if (this.task) {
        this.taskForm.patchValue(this.task);
      }
    }
  }

  onSubmit(): void {
      const taskData = this.taskForm.value as Task;
      if (this.isEditMode && this.task) {
        taskData.id = this.task.id;
        this.taskService.updateTask(taskData);
      } else {
        this.taskService.addTask(taskData);
      }
      this.router.navigate(['/tasks']);
  }
}
