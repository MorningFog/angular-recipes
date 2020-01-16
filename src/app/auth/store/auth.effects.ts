import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap, switchMapTo } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth-service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  urls = {
    signup:
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      environment.firebaseAPIKey,
    login:
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      environment.firebaseAPIKey
  };

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(this.urls.signup, {
          email: signUpAction.payload.email,
          password: signUpAction.payload.password,
          returnSecureToken: true
        })
        .pipe(
          map(resData => this.handleAuthentication(resData)),
          catchError((errorRes: HttpErrorResponse) =>
            this.handleError(errorRes)
          )
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(this.urls.login, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
          map(resData => this.handleAuthentication(resData)),
          catchError((errorRes: HttpErrorResponse) =>
            this.handleError(errorRes)
          )
        );
    })
  );

  @Effect({
    dispatch: false
  })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _TOKEN: string;
        _TOKEN_EXPIRATION_DATE: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'Dummy Action' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._TOKEN,
        new Date(userData._TOKEN_EXPIRATION_DATE)
      );

      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._TOKEN_EXPIRATION_DATE).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._TOKEN_EXPIRATION_DATE),
          redirect: false
        });
      }
      return { type: 'DummyAction' };
    })
  );

  @Effect({
    dispatch: false
  })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth']);
    })
  );

  private handleAuthentication(resData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );

    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));

    this.authService.setLogoutTimer(+resData.expiresIn * 1000);

    return new AuthActions.AuthenticateSuccess({
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expirationDate,
      redirect: true
    });
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.AuthenticateFail(errorMsg));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'Email/Username not found';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Password is invalid';
        break;
      case 'USER_DISABLED':
        errorMsg = 'Your account has been disabled';
        break;
      case 'EMAIL_EXISTS':
        errorMsg = 'Email/Username already exists';
        break;
    }
    return of(new AuthActions.AuthenticateFail(errorMsg));
  }
}
