import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ItemService} from '../item.service';
import {Item} from '../item';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-income-modal',
  templateUrl: './add-income-modal.component.html',
  styleUrls: ['./add-income-modal.component.css'],
  providers: [NgbModalConfig, NgbModal, {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class AddIncomeModalComponent {
  @Output() incomeCreated = new EventEmitter<Item>();
  @ViewChild('content', {static: false}) content: any;


  closeResult: string;
  item: Item;

  constructor(
    private route: ActivatedRoute, private router: Router,
    config: NgbModalConfig, private modal: NgbModal, private itemService: ItemService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.item = new Item();
  }

  open() {
    this.modal.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }

  onSubmit() {
    this.itemService
      .addItemUnderMainCategory('INCOME', this.item)
      .subscribe(result => {
        this.gotoIncomeList();
        this.incomeCreated.emit(result);
        this.modal.dismissAll(true);
      });
  }

  gotoIncomeList() {
    this.router.navigate(['budget/INCOME']);
  }

}
