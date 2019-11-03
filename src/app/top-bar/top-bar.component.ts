import {Component} from '@angular/core';
import {NgbDatepickerNavigateEvent} from '@ng-bootstrap/ng-bootstrap';
// import {IncomeListComponent} from "../income/income-list/income-list.component";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  selectedDate: string;
  private year: string;
  private month: string;

  constructor() {
    this.year = new Date().getFullYear().toString();
    this.month = new Date().getMonth().toString();
    this.selectedDate = this.year + '-' + this.month;
  }

  dateNavigate($event: NgbDatepickerNavigateEvent) {
    this.year = $event.next.year.toString();
    this.month = $event.next.month.toString();
    if ($event.next.month < 10) {
      this.month = '0' + this.month;
    }
    this.selectedDate = this.year + '-' + this.month;
  }

  get getSelectedDate(): string {
    return this.selectedDate;
  }

}
