import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../item';
import {ItemService} from '../../item.service';
import {ConfirmService} from '../../shared/confirmation/confirm-service';
import {ItemEditorComponent} from '../item-editor/item-editor.component';
import {TopBarComponent} from '../../top-bar/top-bar.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {
  @ViewChild(ItemEditorComponent, {static: false})
  itemEditor: ItemEditorComponent;

  isCollapsed: boolean;
  clicked: boolean;
  items: Item[];
  filterDataByDate: Item[];

  constructor(private itemService: ItemService, private confirmService: ConfirmService,
              private topBarComponent: TopBarComponent) {
    this.isCollapsed = true;
    this.clicked = false;
  }

  ngOnInit() {
    this.getIncomeListByDate();
  }

  getIncomeListByDate() {
    this.getIncomeList().then(r =>
      this.searchByDate(this.topBarComponent.getSelectedDate)
    );
  }

  async getIncomeList() {
    this.items = await this.itemService.findAll('INCOME');
  }

  searchByDate(selectedDate: string) {
    if (!selectedDate) {
      this.filterDataByDate = this.items;
    } else {
      this.filterDataByDate = this.items.filter(x =>
        x.date.toString().includes(selectedDate)
      );
    }
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
