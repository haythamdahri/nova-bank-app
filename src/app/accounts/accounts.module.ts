import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserBankAccountsComponent } from './user-bank-accounts/user-bank-accounts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckingAccountsComponent } from './checking-accounts/checking-accounts.component';
import { SavingAccountsComponent } from './saving-accounts/saving-accounts.component';
import { HomeComponent } from './home/home.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionsModule } from './transactions/transactions.module';
import { LoaderComponent } from '../loader/loader.component';
import { AccountFormComponent } from './account-form/account-form.component';

const routes: Routes = [
  { path: '', component: AccountsListComponent},
  { path: 'account-form', component: AccountFormComponent},
  { path: 'account-form/:userAccountNumber', component: AccountFormComponent},
  { path: 'accounts/:userAccountNumber',
    component: HomeComponent,
    children: [
      { path: '', component: UserBankAccountsComponent },
      { path: 'checking-accounts', component: CheckingAccountsComponent },
      { path: 'saving-accounts', component: SavingAccountsComponent },
      { path: 'transactions', component: TransactionsListComponent }
    ]
  }
];


@NgModule({
  declarations: [
    AccountsListComponent,
    UserBankAccountsComponent,
    CheckingAccountsComponent,
    SavingAccountsComponent,
    HomeComponent,
    LoaderComponent,
    AccountFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    TransactionsModule
  ],
  exports: [RouterModule]
})
export class AccountsModule { }
