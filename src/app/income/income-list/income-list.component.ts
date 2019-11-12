import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Item} from '../../item';
import {ItemService} from '../../item.service';
import {ConfirmService} from '../../shared/confirmation/confirm-service';
import {ItemEditorComponent} from '../item-editor/item-editor.component';
import {DatepickerRangeComponent} from '../../shared/datepicker-range/datepicker-range.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css'],
})
export class IncomeListComponent implements AfterViewInit {
  @ViewChild(ItemEditorComponent, {static: false}) itemEditor: ItemEditorComponent;

  @ViewChild(DatepickerRangeComponent, {static: false}) datepickerRange;


  isCollapsed: boolean;
  clicked: boolean;
  items: Item[];

  constructor(private itemService: ItemService, private confirmService: ConfirmService) {
    this.isCollapsed = true;
    this.clicked = false;
  }

  ngAfterViewInit() {
    this.getIncomeList();
  }

  getIncomeList() {
    this.itemService.getItemsBetweenDates('INCOME',
      this.datepickerRange.formatNgbDateToISO8601(this.datepickerRange.fromDate),
      this.datepickerRange.formatNgbDateToISO8601(this.datepickerRange.toDate),
    ).subscribe(data => {
        this.items = data;
      },
      error => console.log(error));
  }

  deleteItem(item) {
    this.confirmService.confirm({
      title: 'Confirm deletion', message: 'Do you really want to delete this Income: '
        + 'Name: ' + item.name + ', Price: ' + item.money + ', Date: ' + item.date
    }).then(
      () => {
        this.itemService.deleteItem(item).subscribe(data => {
          this.getIncomeList();
          console.log('success delete');
        });
      });
  }

  editItem(item) {
    this.itemEditor.setUpFormWithItemValues(item);
  }

}
