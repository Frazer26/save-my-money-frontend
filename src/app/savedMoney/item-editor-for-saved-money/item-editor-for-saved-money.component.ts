import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../item';
import {ItemService} from '../../item.service';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {AppSettings} from '../../shared/app-settings';

@Component({
  selector: 'app-item-editor-for-saved-money',
  templateUrl: './item-editor-for-saved-money.component.html',
  styleUrls: ['./item-editor-for-saved-money.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ItemEditorForSavedMoneyComponent {
  @Output() saveMoneyCreated = new EventEmitter<Item>();
  @Output() collapse = new EventEmitter();
  @Output() enabledButtons = new EventEmitter();

  private itemFormGroup: FormGroup;
  private itemFromTable: Item = new Item();

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    this.clearForm();
  }

  onSubmitSavedMoney(itemFormGroup) {
    if (this.itemFromTable.id != null) {
      this.editItem(this.itemFromTable, this.itemFromTable.id, itemFormGroup);
    } else {
      this.postItemUnderSavedMoney(AppSettings.SAVED_MONEY, itemFormGroup);
    }
    this.itemFormGroup.reset();
  }

  private editItem(itemFromTable: Item, itemId: number, itemFormGroup) {
    let editedItem: Item;
    editedItem =
      this.fillItem(itemFromTable, itemFormGroup.getRawValue().name,
        itemFormGroup.getRawValue().money, itemFormGroup.getRawValue().date);

    this.itemService.updateItem(itemId, editedItem)
      .subscribe(
        data => {
          console.log('success!', data);
        },
        error => console.error('could not update because', error)
      );
    itemId = null;
  }

  private postItemUnderSavedMoney(mainCategory: string, itemFormGroup) {
    this.itemService
      .addItemUnderMainCategory(mainCategory, itemFormGroup.getRawValue())
      .subscribe(
        data => {
          console.log('success!', data);
          this.saveMoneyCreated.emit(data);
        },
        error => console.error('could not post because', error)
      );
  }

  setUpFormWithItemValues(item) {
    this.itemFromTable = item;
    this.itemFormGroup.setValue({
      name: item.name,
      money: item.money,
      date: new Date(item.date)
    });
  }

  fillItem(itemFormTable, formItemName, formItemMoney, formItemDate): Item {
    let item: Item;
    item = itemFormTable;
    item.name = formItemName;
    item.money = formItemMoney;
    item.date = formItemDate;
    return item;
  }

  clearForm() {
    this.itemFormGroup = this.fb.group({
      name: new FormControl('', Validators.required),
      money: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
    this.collapse.emit(true);
    this.enabledButtons.emit(false);
  }

}
