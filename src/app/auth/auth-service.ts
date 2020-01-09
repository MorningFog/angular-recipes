import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;

    urls = {
        signup: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8cW8VQJgAOvDqWpjcgG1O21hj2k3rG3Y',
        login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8cW8VQJgAOvDqWpjcgG1O21hj2k3rG3Y'
    };

    constructor(private http: HttpClient, private route: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.urls.signup,
            {
                email,
                password,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                })
            );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.urls.login,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    logout() {
        this.user.next(null);
        this.route.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _TOKEN: string;
            _TOKEN_EXPIRATION_DATE: string;
        }
            = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._TOKEN, new Date(userData._TOKEN_EXPIRATION_DATE));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._TOKEN_EXPIRATION_DATE).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirattionDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirattionDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
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
        return throwError(errorMsg);
    }
}
