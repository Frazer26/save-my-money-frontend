import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import {ItemEditorComponent} from './income/item-editor/item-editor.component';
import {DatepickerRangeComponent} from './shared/datepicker-range/datepicker-range.component';
import {SavedMoneyListComponent} from './savedMoney/saved-money-list/saved-money-list.component';
import {ItemEditorForSavedMoneyComponent} from './savedMoney/item-editor-for-saved-money/item-editor-for-saved-money.component';
import {CostSubCategoryListComponent} from './Cost/cost-sub-category-list/cost-sub-category-list.component';
import {SubCategoryService} from './sub-category.service';
import {
  SubCategoryPostModalComponent,
  SubCategoryPostModalContentComponent
} from './Cost/sub-category-post-modal/sub-category-post-modal.component';
import {
  SubCategoryUpdateModalComponent,
  SubCategoryUpdateModalContentComponent
} from './Cost/sub-category-update-modal/sub-category-update-modal.component';
import {ItemPostModalComponent, ItemPostModalContentComponent} from './Cost/item-post-modal/item-post-modal-component';
import {
  ItemUpdateModalComponent,
  ItemUpdateModalContentComponent
} from './Cost/item-update-modal/item-update-modal-component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    IncomeListComponent,
    ConfirmModalComponent,
    ConfirmTemplateDirective,
    ItemEditorComponent,
    DatepickerRangeComponent,
    SavedMoneyListComponent,
    ItemEditorForSavedMoneyComponent,
    CostSubCategoryListComponent,
    SubCategoryPostModalComponent,
    SubCategoryPostModalContentComponent,
    SubCategoryUpdateModalComponent,
    SubCategoryUpdateModalContentComponent,
    ItemPostModalContentComponent,
    ItemPostModalComponent,
    ItemUpdateModalComponent,
    ItemUpdateModalContentComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [SubCategoryPostModalContentComponent, SubCategoryUpdateModalContentComponent,
    ItemPostModalContentComponent, ItemUpdateModalContentComponent],
  providers: [ItemService, SubCategoryService, ConfirmService, ConfirmState],
  bootstrap: [AppComponent]
})
export class AppModule {
}
