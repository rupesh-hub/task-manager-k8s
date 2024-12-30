import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {GlobalResponse, TaskResponse} from "../model/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL: string = `${environment.API_URL}/tasks`;

  constructor(private _http: HttpClient) {
  }

  public getTasks = (): Observable<TaskResponse[]> => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`
    });

    return this._http.get<GlobalResponse<TaskResponse[]>>(this.API_URL, { headers })
      .pipe(
        map((response: GlobalResponse<TaskResponse[]>) => {
          console.log('Tasks fetched:', response.data);
          return response.data;
        })
      );
  }

}
