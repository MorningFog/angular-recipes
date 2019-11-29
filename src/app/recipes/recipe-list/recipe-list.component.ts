import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Chicken Wings', 'Crispy yet succulent', 'https://cdn.pixabay.com/photo/2019/05/19/12/23/chicken-farm-4213949_1280.jpg'),
    new Recipe('Avocado on Toast', 'Healthy alternative', 'https://p0.pxfuel.com/preview/359/525/312/avocado-toast-snack-healthy.jpg'),
    new Recipe('Healthy Breakfast', 'Start your day well', 'https://p0.piqsels.com/preview/540/349/270/bread-breakfast-dish-green.jpg'),
  ];
  constructor() { }

  ngOnInit() {
  }

}
