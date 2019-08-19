import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IncomeListComponent} from './income-list/income-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'budget/INCOME', pathMatch: 'full' },
  {path: 'budget/INCOME', component: IncomeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
