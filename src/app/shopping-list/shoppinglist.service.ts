import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

    ingredientChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 10),
        new Ingredient('Tomatoes', 5),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}
