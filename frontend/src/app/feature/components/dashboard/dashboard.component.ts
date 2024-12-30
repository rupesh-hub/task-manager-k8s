import {Component, inject, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {TaskResponse} from "../../model/task.model";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private _taskService: TaskService = inject(TaskService);
  protected tasks: TaskResponse[];

  constructor() {
    this.allTasks();
  }

  public ngOnInit = (): void => {

  }

  protected editTask = (task: any) => {

  }

  protected deleteTask = (taskId: number) => {
    this._taskService.deleteTask(taskId)
      .subscribe({
        next: () => {
          this.allTasks();
        },
        error: (error) => console.error(error)
      })
  }

  private allTasks = () => {
    this._taskService.getTasks()
      .subscribe({
        next: (tasks: TaskResponse[]) => {
          console.log('Tasks:', tasks);
          this.tasks = tasks;
        },
        error: (error) => console.error(error)
      });
  }

}
