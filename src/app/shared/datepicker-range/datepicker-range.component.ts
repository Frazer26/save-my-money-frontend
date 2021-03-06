import {Component, EventEmitter, Output} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styles: [`
      .custom-day {
          text-align: center;
          padding: 0.185rem 0.25rem;
          display: inline-block;
          height: 2rem;
          width: 2rem;
      }

      .custom-day.focused {
          background-color: #e6e6e6;
      }

      .custom-day.range, .custom-day:hover {
          background-color: rgb(2, 117, 216);
          color: white;
      }

      .custom-day.faded {
          background-color: rgba(2, 117, 216, 0.5);
      }
  `]
})
export class DatepickerRangeComponent {
  @Output() selectedDateRange = new EventEmitter();

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(calendar: NgbCalendar, private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.selectedDateRange.emit(true);
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  formatNgbDateToISO8601(date: NgbDate): string {
    return this.ngbDateParserFormatter.format(date);
  }
}
