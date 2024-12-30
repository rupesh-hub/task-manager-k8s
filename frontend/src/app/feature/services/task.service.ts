import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {GlobalResponse, TaskRequest, TaskResponse} from "../model/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL: string = `${environment.API_URL}/tasks`;

  constructor(private _http: HttpClient) {}

  public getTasks = (): Observable<TaskResponse[]> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.get<GlobalResponse<TaskResponse[]>>(this.API_URL, { headers })
      .pipe(
        map((response: GlobalResponse<TaskResponse[]>) => {
          return response.data;
        })
      );
  }

  public getTaskById = (taskId: number): Observable<TaskResponse> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.get<GlobalResponse<TaskResponse>>(`${this.API_URL}/${taskId}`, { headers })
     .pipe(
        map((response: GlobalResponse<TaskResponse>) => {
          return response.data;
        })
      );
  }

  public createTask = (task: TaskRequest): Observable<TaskResponse> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post<GlobalResponse<TaskResponse>>(this.API_URL, task, { headers })
     .pipe(
        map((response: GlobalResponse<TaskResponse>) => {
          console.log('Task created:', response.data);
          return response.data;
        })
      );
  }

  public updateTask = (taskId: number, task: TaskRequest): Observable<TaskResponse> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put<GlobalResponse<TaskResponse>>(`${this.API_URL}/${taskId}`, task, { headers })
     .pipe(
        map((response: GlobalResponse<TaskResponse>) => {
          console.log('Task updated:', response.data);
          return response.data;
        })
      );
  }

  public deleteTask = (taskId: number): Observable<GlobalResponse<any>> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.delete<GlobalResponse<any>>(`${this.API_URL}/${taskId}`, { headers })
     .pipe(
        map((response: GlobalResponse<any>) => {
          return response;
        })
      );
  }

}
