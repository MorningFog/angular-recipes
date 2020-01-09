import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth-service';
import { Observable } from 'rxjs';

import { AuthResponseData } from './auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if (!this.isLoginMode) {
      authObservable = this.authService.signUp(email, password);
    } else {
      authObservable = this.authService.login(email, password);
    }

    authObservable.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  clearError() {
    this.error = null;
    this.isLoading = false;
  }
}
