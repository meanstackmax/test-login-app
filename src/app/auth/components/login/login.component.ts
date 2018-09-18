import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormSubmitted = false;
  loginInProgress = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.makeForm();
  }

  makeForm(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])]
    });
  }

  get usernameControl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  login(): void {
    this.loginFormSubmitted = true;
    if (this.loginInProgress) {
      return;
    }
    if (!this.loginForm.valid) {
      this.loginForm.markAsTouched();
      return;
    }

    this.loginInProgress = true;
    this.auth.login(this.loginForm.value).subscribe(res => {
      this.toastr.success('Success');
      this.router.navigate(['home']);
    }, (err: HttpErrorResponse) => {
      this.loginFormSubmitted = false;
      this.loginInProgress = false;
      this.toastr.error(err.error.error_description || 'Something went wrong');
    });
  }

}
