import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private shoppingListServivce: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListServivce.getIngredients();
    this.shoppingListServivce.ingredientChanged.subscribe((ingredients: Ingredient[]) => { this.ingredients = ingredients; });
  }

  onClearList() {
    this.ingredients.splice(0, this.ingredients.length);
  }
}
