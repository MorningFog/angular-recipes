import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: AuthComponent }]),
        SharedModule
    ],
    declarations: [
        AuthComponent
    ],
    exports: [
        AuthComponent
    ]
})
export class AuthModule { }
