import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';
import { AuthService } from '../auth/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;

  private userSub: Subscription;

  isAuthenticated = false;

  constructor(private dataStoreService: DataStorageService, private authService: AuthService) { }


  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = user ? true : false;
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onSaveData() {
    this.dataStoreService.storeRecipes();
  }

  onFetchData() {
    this.dataStoreService.fetchRecipes().subscribe();
  }
}
