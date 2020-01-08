import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiKey = 'AIzaSyA8cW8VQJgAOvDqWpjcgG1O21hj2k3rG3Y';

    urls = {
        signup: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
    };

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.urls.signup,
            {
                email,
                password,
                returnSecureToken: true
            }
        )
            // .pipe(
            //     catchError(errorResponse => {
            //         let errorMsg = 'An unknown error occurred';
            //         if (!errorResponse.error || !errorResponse.error.error) {
            //             return throwError(errorMsg);
            //         }
            //         switch (errorResponse.error.error.message) {
            //             case 'EMAIL_EXISTS':
            //                 errorMsg = 'Email/Username already exists';
            //         }
            //         throwError(errorMsg);
            //     })
            // )
            ;
    }
}
