import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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

  itemFormGroup: FormGroup;
  private newItem: Item = new Item();

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    this.itemFormGroup = this.fb.group({
      name: new FormControl(''),
      money: new FormControl(''),
      date: new FormControl('')
    });
  }

  onSubmit() {
    this.newItem = this.itemFormGroup.getRawValue();
    this.itemService
      .addItemUnderMainCategory('INCOME', this.newItem)
      .subscribe(
        data => {
          console.log('success!', data);
          this.incomeCreated.emit(data);
          this.itemFormGroup.reset();
        },
        error => console.error('could not post because', error)
      );
  }

}
