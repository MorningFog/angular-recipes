import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private idChangeSubscrption: Subscription;

  constructor(private shoppingListServivce: ShoppingListService, private logService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListServivce.getIngredients();
    this.idChangeSubscrption =
      this.shoppingListServivce.ingredientChanged.subscribe((ingredients: Ingredient[]) => { this.ingredients = ingredients; });
  }

  onEditItem(index: number) {
    this.shoppingListServivce.ingredientEdited.next(index);
  }

  ngOnDestroy(): void {
    this.idChangeSubscrption.unsubscribe();
  }
}
