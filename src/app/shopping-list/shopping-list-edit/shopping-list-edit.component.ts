import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

  @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef;

  @Output() clearListEvent = new EventEmitter<void>();

  constructor(private shoppingListService: ShoppingListService) { }

  onAddItem() {
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this.shoppingListService.addIngredient(newIngredient);
  }

  clearList() {
    this.clearListEvent.emit();
  }
}
