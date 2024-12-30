import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, of, tap} from "rxjs";
import {AuthenticationResponse} from "../components/model/authentication.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private BASE_URL: string = `${environment.API_URL}/authentication`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  public authenticatedUser$ = new BehaviorSubject<any>({});
  private _router: Router = inject(Router);

  constructor(private _http: HttpClient) {
  }

  public login(email: string, password: string): Observable<boolean> {
    return this._http
      .post<any>(`${this.BASE_URL}/sign-in`, {
        email,
        password,
      })
      .pipe(
        tap({
          next: (response) => {
            if (response && response.data) {
              this.storeToLocalStorage(response.data);
              this.isAuthenticatedSubject.next(true);
              this._router.navigate(['/dashboard']);
            } else {
              this.isAuthenticatedSubject.next(false);
            }
          },
          error: (err) => {
            console.error('Login failed', err);
            this.isAuthenticatedSubject.next(false);
          },
        })
      );
  }

  public logout(): void {
    this._http
      .post(`${this.BASE_URL}/sign-out`, {})
      .pipe(
        tap({
          next: (response: any) => {
            console.log('Logging out => ' + response);
            localStorage.clear();
            this.isAuthenticatedSubject.next(false);
            this.authenticatedUser$.next(null);
            this._router.navigate(['/auth/login']);
          },
          error: (err) => {
            console.error('Logout failed', err);
            this.isAuthenticatedSubject.next(false);
          },
        })
      )
      .subscribe();
  }

  public register(request: any): Observable<any> {
    return this._http.post<any>(`${this.BASE_URL}/sign-up`, request);
  }

  private userToLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): AuthenticationResponse {
    return JSON.parse(localStorage.getItem('user'));
  }

  private storeToLocalStorage = (user: any): void => {
    localStorage.setItem('user', JSON.stringify(user));
    this.authenticatedUser$.next(JSON.parse(localStorage.getItem('user')));
  };

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

}
