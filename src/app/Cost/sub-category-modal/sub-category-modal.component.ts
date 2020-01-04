import {Component} from '@angular/core';
import {NgbActiveModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SubCategoryService} from '../../sub-category.service';

// For post
@Component({
  template: `
      <div class="modal-header">
          <h4 class="modal-title">Add new SubCategory</h4>
          <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <form (ngSubmit)="submitForm(subcategoryPostForm)" [formGroup]="subcategoryPostForm">
          <div class="modal-boy">
              <div class="container">
                  <div class="form-group">
                      <label for="name">SubCategory name:</label>
                      <input type="text"
                             class="form-control"
                             formControlName="name"/>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <button class="btn btn-success"
                      [disabled]="!subcategoryPostForm.valid">
                  Add SubCategory
              </button>
          </div>

          <pre>FormGroup Item: {{ subcategoryPostForm.getRawValue() | json }}</pre>

      </form>`
})
export class SubCategoryModalComponent {
  modalOptions: NgbModalOptions;
  modal: NgbModalRef;
  subcategoryPostForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
              private subCategoryService: SubCategoryService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
    this.createForm();
  }

  private createForm() {
    this.subcategoryPostForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
  }

  private submitForm(subcategoryPostForm) {
    this.subCategoryService.addSubCategoryUnderCost(subcategoryPostForm.getRawValue())
      .subscribe(
        data => {
          console.log('success!', data);
        },
        error => console.error('could not add new subcategory because', error)
      );
    this.activeModal.dismiss();
  }

}
