import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    if (!this.isLoginMode) {
      this.authService.signUp(email, password)
        .subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
          },
          errorResponse => {
            console.log(errorResponse);
            let errorMsg = 'An unknown error occurred!';
            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMsg = 'Email/Username already exists';
            }
            this.error = errorMsg;

            this.isLoading = false;
          }
        );
    }
    form.reset();
  }

  clearError() {
    this.error = null;
    this.isLoading = false;
  }
}
