import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../recipes/recipe.model';

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
        this.updateIngredientsChanged();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.updateIngredientsChanged();
    }

    private updateIngredientsChanged() {
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}
