import {Component} from '@angular/core';
import {ConfirmOptions} from './confirm-options';
import {ConfirmState} from './confirm-state';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ options.title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="no()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ options.message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="yes()">Yes</button>
      <button type="button" class="btn btn-secondary" (click)="no()">No</button>
    </div>`
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
