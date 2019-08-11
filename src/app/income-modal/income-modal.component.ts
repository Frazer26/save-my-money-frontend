import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-income-modal',
  templateUrl: './income-modal.component.html',
  styleUrls: ['./income-modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class IncomeModalComponent implements OnInit {
  @ViewChild('content', {static: false}) content: any;

  closeResult: string;

  constructor(config: NgbModalConfig, private modal: NgbModal, private itemService: ItemService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    this.modal.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }

  ngOnInit() {
  }

  addToIncome(item) {
    this.itemService.addItemUnderMainCategory('INCOME', item);
  }

}
