import { NgModule } from '@angular/core';

import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
    declarations: [
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [RouterModule, CommonModule, ReactiveFormsModule, RecipesRoutingModule],
    exports: [
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ]
})
export class RecipesModule { }
