import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IncomeListComponent} from './income/income-list/income-list.component';
import {SavedMoneyListComponent} from './savedMoney/saved-money-list/saved-money-list.component';
import {CostSubCategoryListComponent} from './Cost/cost-sub-category-list/cost-sub-category-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'budget/INCOME', pathMatch: 'full' },
  {path: 'budget/INCOME', component: IncomeListComponent },
  {path: 'budget/SAVED_MONEY', component: SavedMoneyListComponent },
  {path: 'budget/COST', component: CostSubCategoryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
