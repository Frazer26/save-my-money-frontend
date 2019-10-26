import {Component} from '@angular/core';
import {NgbDatepickerNavigateEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  constructor() {
  }

  dateNavigate($event: NgbDatepickerNavigateEvent) {
    console.log($event.next.month);
    console.log($event.next.year);
  }

}
