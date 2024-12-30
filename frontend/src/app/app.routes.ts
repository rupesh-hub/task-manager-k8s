import {Routes} from '@angular/router';
import {LoginComponent} from "./core/components/login/login.component";
import {RegisterComponent} from "./core/components/register/register.component";
import {DashboardComponent} from "./feature/components/dashboard/dashboard.component";
import {authGuard} from "./core/guards/auth.guard";
import {TaskDetailComponent} from "./feature/components/task-detail/task-detail.component";
import {CreateTaskComponent} from "./feature/components/create-task/create-task.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'task/create',
    component: CreateTaskComponent,
    canActivate: [authGuard]
  },
  {
    path: 'task/:id',
    component: TaskDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
