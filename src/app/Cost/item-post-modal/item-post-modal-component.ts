import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../item';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {ItemService} from '../../item.service';
import {SubCategoryService} from "../../sub-category.service";
import {SubCategory} from "../../sub-category";

@Component({
  selector: 'app-item-post-modal-content',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  template: `
      <div class="modal-header">
          <h4 class="modal-title">New Item</h4>
          <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <form (ngSubmit)="submitForm(itemPostForm)" [formGroup]="itemPostForm">
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
                      [disabled]="!itemPostForm.valid">
                  Add Item
              </button>
          </div>
          <pre>FormGroup Item: {{ itemPostForm.getRawValue() | json }}</pre>
      </form>`
})
export class ItemPostModalContentComponent {
  modalOptions: NgbModalOptions;
  modal: NgbModalRef;
  itemPostForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
              private itemService: ItemService, private subCategoryService: SubCategoryService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
    this.createForm();
  }

  private createForm() {
    this.itemPostForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      money: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
  }

  private submitForm(itemPostForm) {
    this.itemService.addItemUnderSubCategory(this.subCategoryService.getSubCategory.name, itemPostForm.getRawValue())
      .subscribe(
        data => {
          console.log('success!', data);
          this.activeModal.close('success');
        },
        error => console.error('could not add new item because', error)
      );
  }
}

@Component({
  selector: 'app-item-post-modal-component',
  templateUrl: './item-post-modal-component.html',
})
export class ItemPostModalComponent {
  @Input() subcategoryElement: SubCategory;
  @Output() submittedItem = new EventEmitter<Item>();

  constructor(private modalService: NgbModal,
              private subCategoryService: SubCategoryService) {
  }

  open() {
    this.subCategoryService.setData(this.subcategoryElement);

    const modalRef = this.modalService.open(ItemPostModalContentComponent);
    modalRef.result.then((result) => {
      console.log('New item submitted!');
      if (result === 'success') {
        this.submittedItem.emit();
      }
    });
  }

}
