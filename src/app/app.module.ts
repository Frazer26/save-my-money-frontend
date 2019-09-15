import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {IncomeListComponent} from './income/income-list/income-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ItemService} from './item.service';
import {ConfirmModalComponent} from './shared/confirmation/confirm-modal.component';
import {ConfirmTemplateDirective} from './shared/confirmation/confirm-template.directive';
import {ConfirmService} from './shared/confirmation/confirm-service';
import {ConfirmState} from './shared/confirmation/confirm-state';
import { ItemEditorComponent } from './income/item-editor/item-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    IncomeListComponent,
    ConfirmModalComponent,
    ConfirmTemplateDirective,
    ItemEditorComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ItemService, ConfirmService, ConfirmState],
  bootstrap: [AppComponent]
})
export class AppModule {
}
