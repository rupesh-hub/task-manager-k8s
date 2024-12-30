import {Component, inject, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  private router: Router = inject(Router);
  protected isAuthenticated: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  private _authenticationService: AuthenticationService = inject(AuthenticationService);
  private _router: Router = inject(Router);

  public ngOnInit = (): void => {
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this._authenticationService.login(email, password).subscribe({
        next: (response: boolean) => {
          if (response && response === true) this.isAuthenticated = true;
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
          this.loginForm.reset();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
