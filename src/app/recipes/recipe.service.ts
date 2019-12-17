import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppinglist.service';

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('Chicken Wings',
            'Crispy, succulent',
            'https://p1.pxfuel.com/preview/203/967/634/food-cuisine-japanese-food-meat.jpg',
            [
                new Ingredient('Chicken', 2), new Ingredient('BBQ Sauce', 1)
            ]),
        new Recipe('Avocado on Toast',
            'Healthy alternative',
            'https://p0.pxfuel.com/preview/359/525/312/avocado-toast-snack-healthy.jpg',
            [
                new Ingredient('Avocado', 1), new Ingredient('Bread', 2)
            ]),
        new Recipe('Healthy Breakfast',
            'Start your day well',
            'https://p0.piqsels.com/preview/540/349/270/bread-breakfast-dish-green.jpg',
            [
                new Ingredient('Cereal', 200), new Ingredient('Milk', 30)
            ]),
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }
}
