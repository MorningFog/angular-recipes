import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;

  private userSub: Subscription;

  isAuthenticated = false;

  constructor(
    private dataStoreService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) { }


  ngOnInit() {
    this.userSub = this.store.
      select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(
        user => {
          this.isAuthenticated = !!user;
        });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onSaveData() {
    this.dataStoreService.storeRecipes();
  }

  onFetchData() {
    this.dataStoreService.fetchRecipes().subscribe();
  }
}
