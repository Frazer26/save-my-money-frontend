import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../item';
import {ItemService} from '../../item.service';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {AppSettings} from '../../shared/app-settings';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ItemEditorComponent {
  @Output() incomeCreated = new EventEmitter<Item>();
  @Output() collapse = new EventEmitter();
  @Output() enabledButtons = new EventEmitter();

  private itemFormGroup: FormGroup;
  private itemFromTable: Item = new Item();
  private editedItem: Item;

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    this.clearForm();
  }

  onSubmit(itemFormGroup) {
    if (this.itemFromTable.id != null) {
      this.editedItem =
        this.fillItem(this.itemFromTable, itemFormGroup.getRawValue().name,
          itemFormGroup.getRawValue().money, itemFormGroup.getRawValue().date);

      this.itemService.updateItem(this.itemFromTable.id, this.editedItem) // valamiért a dátum -1 napot jelenít meg (backend vagy front)?
        .subscribe(
          data => {
            console.log('success!', data);
          },
          error => console.error('could not update because', error)
        );
      this.itemFromTable.id = null;

    } else {
      this.itemService
        .addItemUnderMainCategory(AppSettings.INCOME, itemFormGroup.getRawValue())
        .subscribe(
          data => {
            console.log('success!', data);
            this.incomeCreated.emit(data);
          },
          error => console.error('could not post because', error)
        );
    }
    this.itemFormGroup.reset();
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
    let item;
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
