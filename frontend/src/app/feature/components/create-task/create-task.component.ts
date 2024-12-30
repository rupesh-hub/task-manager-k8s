import {Component, inject} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

  protected taskForm: FormGroup;
  private _taskService: TaskService = inject(TaskService);
  private _router: Router = inject(Router);

  constructor() {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required])
    });
  }

  protected onCreate = () =>{
    if (this.taskForm.valid) {
      this._taskService.createTask(this.taskForm.value).subscribe(() => {
        this._router.navigate(['/dashboard']);
      });
    } else {
      Object.values(this.taskForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
