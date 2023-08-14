import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { SavingAccount } from 'src/app/models/Saving-account';
import { BankUser } from 'src/app/models/bank-user';
import { CheckingAccount } from 'src/app/models/checking-account';
import { Page } from 'src/app/models/page';
import { Transaction } from 'src/app/models/transaction';
import { BankUsersService } from 'src/app/shared/bank-users.service';
import { CheckingAccountsService } from 'src/app/shared/checking-accounts.service';
import { SavingAccountsService } from 'src/app/shared/saving-accounts.service';
import { TransactionsService } from 'src/app/shared/transactions.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit, OnDestroy {

  bankUserSubscription!: Subscription;
  transactionsSubscription!: Subscription;
  checkingAccountsSubscription!: Subscription;
  savingsAccountsSubscription!: Subscription;
  paramsSubscription!: Subscription;
  bankUser?: BankUser;
  transactionsPage!: Page<Transaction>;
  loading: boolean = false;
  checkingAccounts: CheckingAccount[] = [];
  savingAccounts: SavingAccount[] = [];
  selectedAccount!: SelectedAccount;

  constructor(
    private bankUsersService: BankUsersService,
    private transactionsService: TransactionsService,
    private checkingAccountsService: CheckingAccountsService,
    private savingAccountsService: SavingAccountsService,
    private activatedRoute: ActivatedRoute  
  ) {}
  
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.parent!.params.subscribe(
      (params) => {
        this.bankUserSubscription = this.bankUsersService.getBankUserByUserAccountNumber(params['userAccountNumber']).pipe(take(1)).subscribe(
          (bankUser) => {
            this.bankUser = bankUser;
            this.fetchCheckingAccounts(bankUser.userAccountNumber);
            this.fetchSavingAccounts(bankUser.userAccountNumber);
          }
        )
      }
    )
  }

  ngOnDestroy(): void {
    this.bankUserSubscription?.unsubscribe();
    this.transactionsSubscription?.unsubscribe();
    this.checkingAccountsSubscription?.unsubscribe();
    this.savingsAccountsSubscription?.unsubscribe();
  }

  onPreviousPage(): void {
    if (!this.transactionsPage?.first) {
      this.fetchTransactionsPage(Number(this.transactionsPage?.number) - 1);
    }
  }

  onNextPage(): void {
    if (!this.transactionsPage?.last) {
      this.fetchTransactionsPage(Number(this.transactionsPage?.number) + 1);
    }
  }

  onAccountSelected(event: Event): void {
    const accountNumber = (<HTMLSelectElement>event.target).value;
    if (accountNumber == "") {
      this.transactionsPage = new Page<Transaction>();
      this.transactionsPage.empty = true;
      this.loading = false;
      return;
    }
    const selectedAccount = this.findAccount(accountNumber);
    if (selectedAccount) {
      this.selectedAccount = selectedAccount;
      this.fetchTransactionsPage();
    }
  }

  fetchTransactionsPage(page: number = 0): void {
    this.loading = true;
    this.transactionsPage = new Page<Transaction>();
    switch (this.selectedAccount?.accountType) {
      case 'checkingAccount':
        this.transactionsSubscription = this.transactionsService.getCheckingAccountTransactions(this.selectedAccount?.accountNumber, page).subscribe(
          (transactionsPage) => {
            this.transactionsPage = transactionsPage;
            this.loading = false;
          }
        )
        break;
      case 'savingAccount':
        this.transactionsSubscription = this.transactionsService.getSavingAccountTransactions(this.bankUser!.userAccountNumber, page).subscribe(
          (transactionsPage) => {
            this.transactionsPage = transactionsPage;
            this.loading = false;
          }
        )
        break;
    }
    
  }

  fetchCheckingAccounts(userAccountNumber: string): void {
    this.checkingAccountsSubscription = this.checkingAccountsService.getCheckingAccountsByAccountNumber(userAccountNumber).pipe(take(1)).subscribe(
      (accounts) => this.checkingAccounts = accounts
    );
  }

  fetchSavingAccounts(userAccountNumber: string): void {
    this.savingsAccountsSubscription = this.savingAccountsService.getSavingAccountsByAccountNumber(userAccountNumber).pipe(take(1)).subscribe(
      (savingAccounts) => this.savingAccounts = savingAccounts
    );
  }

  private findAccount(accountNumber: string): SelectedAccount | undefined {
    const checkingAccount: CheckingAccount | undefined = this.checkingAccounts.find(account => account.accountNumber == accountNumber);
    if (checkingAccount) {
      return {
        accountType: 'checkingAccount', accountNumber
      }
    }
    const savingAccount: SavingAccount | undefined = this.savingAccounts.find(account => account.accountNumber == accountNumber);
    if (savingAccount) {
      return {
        accountType: 'savingAccount', accountNumber
      }
    }
    return undefined;
  }

}

type SelectedAccount = {
    accountType: 'checkingAccount' | 'savingAccount',
    accountNumber: string
}
