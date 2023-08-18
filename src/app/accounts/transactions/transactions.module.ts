import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TransactionsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class TransactionsModule { }
