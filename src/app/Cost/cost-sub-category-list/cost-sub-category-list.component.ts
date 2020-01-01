import {AfterViewInit, Component} from '@angular/core';
import {SubCategoryService} from '../../sub-category.service';
import {SubCategory} from '../../sub-category';
import {ConfirmService} from '../../shared/confirmation/confirm-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SubCategoryModalComponent} from '../sub-category-modal/sub-category-modal.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './cost-sub-category-list.component.html',
  styleUrls: ['./cost-sub-category-list.component.css']
})
export class CostSubCategoryListComponent implements AfterViewInit {

  subcategories: SubCategory[];

  constructor(private subcategoryService: SubCategoryService, private confirmService: ConfirmService,
              private modalService: NgbModal) {
  }

  getSubCategoryList() {
    this.subcategoryService.getSubCategories(
    ).subscribe(data => {
        this.subcategories = data;
      },
      error => console.log(error));
  }

  ngAfterViewInit(): void {
    this.getSubCategoryList();
  }

  deleteSubCategory(subCategory) {
    this.confirmService.confirm({
      title: 'Confirm deletion', message: 'Do you really want to delete this SubCategory: '
        + 'Name: ' + subCategory.name
    }).then(
      () => {
        this.subcategoryService.deleteSubCategory(subCategory).subscribe(data => {
          this.getSubCategoryList();
          console.log('success delete');
        });
      });
  }

  open() {
    this.modalService.open(SubCategoryModalComponent);
  }

}
