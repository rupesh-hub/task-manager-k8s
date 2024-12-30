import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {TaskResponse} from "../../model/task.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent {

  private _taskService:TaskService = inject(TaskService);
  private id: any;
  protected task: any;

  constructor(private _activatedRoute:ActivatedRoute) {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');

    //fetch details
    this._taskService.getTaskById(this.id).subscribe(
      {
        next: (task:TaskResponse) => {
          this.task = task;
        },
        error: (error) => console.error(error)
      }
    );

  }



}
