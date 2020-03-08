import {AfterViewInit, Component} from '@angular/core';
import {SubCategoryService} from '../../sub-category.service';
import {SubCategory} from '../../sub-category';
import {ConfirmService} from '../../shared/confirmation/confirm-service';
import {ItemService} from '../../item.service';
import {Item} from '../../item';

@Component({
  selector: 'app-table-list',
  templateUrl: './cost-sub-category-list.component.html',
  styleUrls: ['./cost-sub-category-list.component.css']
})
export class CostSubCategoryListComponent implements AfterViewInit {

  subcategories: SubCategory[];
  items: Item[];

  constructor(private subcategoryService: SubCategoryService, private itemService: ItemService,
              private confirmService: ConfirmService) {
  }

  getSubCategoryList() {
    this.subcategoryService.getSubCategories()
      .subscribe(data => {
          this.subcategories = data;
        },
        error => console.log(error));
  }

  getAllItemsUnderSubCategories() {
    this.itemService.getAllItemsUnderSubCategories()
      .subscribe(data => {
          this.items = data;
        },
        error => console.log(error));
  }

  ngAfterViewInit(): void {
    this.getSubCategoryList();
    this.getAllItemsUnderSubCategories();
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

}
