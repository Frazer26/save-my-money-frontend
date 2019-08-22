import { Component, OnInit } from '@angular/core';
import {ConfirmOptions} from '../confirm-options';
import {ConfirmState} from '../confirm-state';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {


  options: ConfirmOptions;

  constructor(private state: ConfirmState) {
    this.options = state.options;
    console.log('component initialized');
  }

  yes() {
    this.state.modal.close('confirmed');
  }

  no() {
    this.state.modal.dismiss('not confirmed');
  }

}
