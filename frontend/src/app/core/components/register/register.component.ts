import {Component, inject} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  private _authenticationService: AuthenticationService = inject(AuthenticationService);
  private _router: Router = inject(Router);

  public register = (): void => {

    if (this.registrationForm.invalid)
      return;

    this._authenticationService.register(this.registrationForm.value)
      .subscribe({
        next: (response: any) => {
          console.log('Registration Successful:', response);
          this._router.navigate(['/login']);
        },
        error: (error) => console.error(error)
      })
  }

}
