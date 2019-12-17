import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientChanged = new Subject<Ingredient[]>();

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
        this.ingredientChanged.next(this.ingredients.slice());
    }
}
