import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  NgbActiveModal,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbModal,
  NgbModalOptions,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Item} from '../../item';
import {ItemService} from '../../item.service';

@Component({
  selector: 'app-item-update-modal-content',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  template: `
      <div class="modal-header">
          <h4 class="modal-title">Update Item</h4>
          <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <form (ngSubmit)="submitForm(itemUpdateForm)" [formGroup]="itemUpdateForm">
          <div class="container">
              <div class="form-group">
                  <label for="itemName">Name</label>
                  <div class="input-group">
                      <input id="itemName" type="text" class="form-control" formControlName="name" required>
                  </div>
              </div>

              <div class="form-group">
                  <label for="itemMoney">Money</label>
                  <div class="input-group">
                      <input id="itemMoney" type="number" class="form-control" required formControlName="money">
                  </div>
              </div>

              <div class="form-group">
                  <label for="itemDate">Date</label>
                  <div class="input-group">
                      <input type="date" id="itemDate" class="form-control" placeholder="yyyy/mm/dd" name="dp"
                             ngbDatepicker
                             #dp="ngbDatepicker" required formControlName="date">
                      <div class="input-group-append">
                          <button class="btn btn-outline-secondary calendar" (click)="dp.toggle()" type="button">
                              <i class="far fa-calendar-alt"></i>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <button class="btn btn-success"
                      [disabled]="!itemUpdateForm.valid">
                  Add Item
              </button>
          </div>
          <pre>FormGroup Item: {{ itemUpdateForm.getRawValue() | json }}</pre>
      </form>`
})
export class ItemUpdateModalContentComponent {
  modalOptions: NgbModalOptions;
  modal: NgbModalRef;
  itemUpdateForm: FormGroup;
  private itemFromTable: Item = new Item();
  private item: Item;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
              private itemService: ItemService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
    this.createForm();
  }

  private createForm() {
    this.itemFromTable = this.itemService.getItem;

    this.itemUpdateForm = this.formBuilder.group({
      name: this.itemFromTable.name,
      money: this.itemFromTable.money,
      date: new Date(this.itemFromTable.date)
    });
  }

  private submitForm(itemUpdateForm) {
    this.item = this.itemUpdateForm.getRawValue();
    this.item.subCategory = this.itemFromTable.subCategory;

    this.itemService.updateItem(this.itemFromTable.id, this.item)
      .subscribe(
        data => {
          console.log('success!', data);
          this.activeModal.close('success');
        },
        error => console.error('could not update item because', error)
      );
  }
}


@Component({
  selector: 'app-item-update-modal-component',
  templateUrl: './item-update-modal-component.html'
})
export class ItemUpdateModalComponent {
  @Input() itemElement: Item;
  @Output() updatedItem = new EventEmitter<Item>();

  constructor(private modalService: NgbModal,
              private itemService: ItemService) {
  }

  open() {
    this.itemService.setItem(this.itemElement);

    const modalRef = this.modalService.open(ItemUpdateModalContentComponent);
    modalRef.result.then((result) => {
      console.log('Update item!');
      if (result === 'success') {
        this.updatedItem.emit();
      }
    });
  }

}
