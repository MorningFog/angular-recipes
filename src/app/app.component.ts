import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  recipesRequested = true;

  updateNavSelection(recipesSelected: boolean) {
    this.recipesRequested = recipesSelected;
  }
}
