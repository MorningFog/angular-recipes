import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { RecipeService } from '../recipes/recipe.service';
// import { Recipe } from '../recipes/recipe.model';
// import { map, tap, } from 'rxjs/operators';
// import { Store } from '@ngrx/store';

// import * as fromApp from '../store/app.reducer';
// import * as RecipeActions from '../recipes/store/recipe.action';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor() {
    // THIS CLASS IS NO LONGER USED DUE TO NGRX IMPLEMENTATION
  }

  // storeRecipes() {
  //     const recipes = this.recipeService.getRecipes();
  //     this.http.put(
  //         'https://ng-course-recipe-book-f2a29.firebaseio.com/recipes.json', recipes)
  //         .subscribe(
  //             response => {
  //                 console.log(response);
  //             }
  //         );
  // }

  // fetchRecipes() {
  //     return this.http.get<Recipe[]>(
  //         'https://ng-course-recipe-book-f2a29.firebaseio.com/recipes.json'
  //     )
  //         .pipe(
  //             map(recipes => {
  //                 return recipes.map(recipe => {
  //                     return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
  //                 });
  //             }), tap(recipes => {
  //                 this.store.dispatch(new RecipeActions.SetRecipes(recipes));
  //             })
  //         );
  // }
}
