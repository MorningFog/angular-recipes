import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientChanged = new Subject<Ingredient[]>();

    ingredientEdited = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 10),
        new Ingredient('Tomatoes', 5),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.updateIngredientsChanged();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.updateIngredientsChanged();
    }

    updateIngredient(index: number, updatedIngredient: Ingredient) {
        this.ingredients[index] = updatedIngredient;
        this.updateIngredientsChanged();
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.updateIngredientsChanged();
    }

    private updateIngredientsChanged() {
        this.ingredientChanged.next(this.ingredients.slice());
    }
}
