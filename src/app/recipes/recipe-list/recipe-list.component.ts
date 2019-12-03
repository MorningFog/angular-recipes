import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Chicken Wings', 'Crispy yet succulent', 'https://get.pxhere.com/photo/japanese-food-chicken-wings-chopsticks-deboned' +
      '-pork-gyoza-dish-cuisine-appetizer-seafood-asian-food-animal-source-foods-meal-side-dish-fried-food-lunch-shrimp-recipe-' +
      'japanese-cuisine-1418346.jpg'),
    new Recipe('Avocado on Toast', 'Healthy alternative', 'https://p0.pxfuel.com/preview/359/525/312/avocado-toast-snack-healthy.jpg'),
    new Recipe('Healthy Breakfast', 'Start your day well', 'https://p0.piqsels.com/preview/540/349/270/bread-breakfast-dish-green.jpg'),
  ];
  constructor() { }

  ngOnInit() {
  }
}
