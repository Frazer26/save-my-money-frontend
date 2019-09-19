import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../item';
import {ItemService} from '../../item.service';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ItemEditorComponent {
  @Output() incomeCreated = new EventEmitter<Item>();

  private itemFormGroup: FormGroup;
  private itemId: null;
  private newItem: Item = new Item();

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    this.itemFormGroup = this.fb.group({
      name: new FormControl('', Validators.required),
      money: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
  }

  onSubmit(itemFormGroup) {
    this.newItem = itemFormGroup.getRawValue();
    if (this.itemId != null) {
      this.itemService.updateItem(this.itemId, this.newItem)
      // nem működik még az update rendesen (Main category null ezért nem jeleníti meg editálás után KITÖLTENI UI-on), de post igen
        .subscribe(
          data => {
            console.log('success!', data);
          },
          error => console.error('could not update because', error)
        );
    } else {
      this.itemService
        .addItemUnderMainCategory('INCOME', this.newItem)
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

  setUpItemFormGroup(item) {
    this.itemId = item.id;
    this.itemFormGroup.setValue({
      name: item.name,
      money: item.money,
      date: new Date(item.date)
    });
  }

}
