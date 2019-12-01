import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Item} from '../../item';
import {ItemService} from '../../item.service';
import {ConfirmService} from '../../shared/confirmation/confirm-service';
import {DatepickerRangeComponent} from '../../shared/datepicker-range/datepicker-range.component';
import {ItemEditorForSavedMoneyComponent} from '../item-editor-for-saved-money/item-editor-for-saved-money.component';
import {AppSettings} from '../../shared/app-settings';

@Component({
  selector: 'app-saved-money-list',
  templateUrl: './saved-money-list.component.html',
  styleUrls: ['./saved-money-list.component.css']
})
export class SavedMoneyListComponent implements AfterViewInit {

  @ViewChild(ItemEditorForSavedMoneyComponent, {static: false}) itemEditor: ItemEditorForSavedMoneyComponent;

  @ViewChild(DatepickerRangeComponent, {static: false}) datepickerRange;

  isCollapsed: boolean;
  clicked: boolean;
  itemsUnderSavedMoney: Item[];

  constructor(private itemService: ItemService, private confirmService: ConfirmService) {
    this.isCollapsed = true;
    this.clicked = false;
  }

  ngAfterViewInit() {
    this.getSavedMoneyList();
  }

  getSavedMoneyList() {
    this.itemService.getItemsBetweenDates(AppSettings.SAVED_MONEY,
      this.datepickerRange.formatNgbDateToISO8601(this.datepickerRange.fromDate),
      this.datepickerRange.formatNgbDateToISO8601(this.datepickerRange.toDate),
    ).subscribe(data => {
        this.itemsUnderSavedMoney = data;
      },
      error => console.log(error));
  }

  deleteItemFromSavedMoney(item) {
    this.confirmService.confirm({
      title: 'Confirm deletion', message: 'Do you really want to delete this Saving: '
        + 'Name: ' + item.name + ', Price: ' + item.money + ', Date: ' + item.date
    }).then(
      () => {
        this.itemService.deleteItem(item).subscribe(data => {
          this.getSavedMoneyList();
          console.log('success delete');
        });
      });
  }

  editItem(item) {
    this.itemEditor.setUpFormWithItemValues(item);
  }
}
