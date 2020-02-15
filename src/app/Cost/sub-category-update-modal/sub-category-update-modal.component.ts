import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SubCategoryService} from '../../sub-category.service';
import {SubCategory} from '../../sub-category';

@Component({
  selector: 'app-sub-category-update-modal-content',
  template: `
      <div class="modal-header">
          <h4 class="modal-title">Update SubCategory</h4>
          <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <form (ngSubmit)="submitForm(subcategoryUpdateForm)" [formGroup]="subcategoryUpdateForm">
          <div class="container">
              <div class="form-group">
                  <label for="name">SubCategory name:</label>
                  <input type="text"
                         class="form-control"
                         formControlName="name"/>
              </div>
          </div>
          <div class="modal-footer">
              <button class="btn btn-success"
                      [disabled]="!subcategoryUpdateForm.valid">
                  Update SubCategory
              </button>
          </div>
          <pre>FormGroup Item: {{ subcategoryUpdateForm.getRawValue() | json }}</pre>
      </form>`
})
export class SubCategoryUpdateModalContentComponent {
  modalOptions: NgbModalOptions;
  modal: NgbModalRef;
  subcategoryUpdateForm: FormGroup;
  private subCategoryFromTable: SubCategory = new SubCategory();

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
    this.subCategoryFromTable = this.subCategoryService.getSubCategory;

    this.subcategoryUpdateForm = this.formBuilder.group({
      name: new FormControl(this.subCategoryFromTable.name, Validators.required),
    });

    // this.subcategoryUpdateForm.setValue({
    //   name: this.subCategoryFromTable.name,
    // });
  }

  private submitForm(subcategoryPostForm) {
    this.subCategoryService.updateSubCategory(this.subCategoryFromTable.id, subcategoryPostForm.getRawValue())
      .subscribe(
        data => {
          console.log('success!', data);
          this.activeModal.close('success');
        },
        error => console.error('could not add new subcategory because', error)
      );
  }
}


@Component({
  selector: 'app-sub-category-update-modal-component',
  templateUrl: './sub-category-update-modal.component.html'
})
export class SubCategoryUpdateModalComponent {
  @Output() submittedSubcategory = new EventEmitter<SubCategory>();

  constructor(private modalService: NgbModal) {
  }

  open() {
    const modalRef = this.modalService.open(SubCategoryUpdateModalContentComponent);
    modalRef.result.then((result) => {
      console.log('Update subcategory submitted!');
      if (result === 'success') {
        this.submittedSubcategory.emit();
      }
    });
  }

}
