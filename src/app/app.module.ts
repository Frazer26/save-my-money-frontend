import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {IncomeListComponent} from './income-list/income-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ItemService} from './item.service';
import {AddIncomeModalComponent} from './add-income-modal/add-income-modal.component';
import {FormsModule} from '@angular/forms';
import {ConfirmModalComponent} from './confirmation/confirm-modal.component';
import {ConfirmTemplateDirective} from './confirmation/confirm-template.directive';
import {ConfirmService} from './confirmation/confirm-service';
import {ConfirmState} from './confirmation/confirm-state';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    IncomeListComponent,
    AddIncomeModalComponent,
    ConfirmModalComponent,
    ConfirmTemplateDirective,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ItemService, ConfirmService, ConfirmState],
  bootstrap: [AppComponent]
})
export class AppModule {
}
