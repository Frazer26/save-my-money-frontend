import {Component, OnInit, ViewChild} from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { AddIncomeModalComponent} from '../add-income-modal/add-income-modal.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {
  @ViewChild('incomeModal', {static: false}) modal: AddIncomeModalComponent;

  items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getIncomeList();
  }

  openIncomeModal() {
    this.modal.open();
  }

  getIncomeList() {
    this.itemService.findAll('INCOME').subscribe(data => {
        this.items = data;
      },
      error => console.log(error));
  }

}
