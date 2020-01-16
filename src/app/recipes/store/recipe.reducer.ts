import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.action';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      console.log('Adding a recipe in the effects');
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
