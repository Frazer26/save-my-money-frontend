import {Component, OnInit, ViewChild} from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { IncomeModalComponent} from '../income-modal/income-modal.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {
  @ViewChild('incomeModal', {static: false}) modal: IncomeModalComponent;

  items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.findAll('INCOME').subscribe(data => {
      this.items = data;
    },
      error => console.log(error));
  }

  openIncomeModal() {
    this.modal.open();
  }

}
