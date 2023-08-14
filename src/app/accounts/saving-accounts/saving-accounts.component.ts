import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SavingAccount } from 'src/app/models/Saving-account';
import { BankUser } from 'src/app/models/bank-user';
import { BankUsersService } from 'src/app/shared/bank-users.service';
import { SavingAccountsService } from 'src/app/shared/saving-accounts.service';

@Component({
  selector: 'app-saving-accounts',
  templateUrl: './saving-accounts.component.html',
  styleUrls: ['./saving-accounts.component.css']
})
export class SavingAccountsComponent implements OnInit, OnDestroy {

  bankUserSubscription!: Subscription;
  savingAccountsSubscription!: Subscription;
  paramsSubscription!: Subscription;
  bankUser?: BankUser;
  savingAccounts?: SavingAccount[] = [];
  loading: boolean = true;

  constructor(
    private bankUsersService: BankUsersService,
    private savingAccountsService: SavingAccountsService,
    private activatedRoute: ActivatedRoute  
  ) {}
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.parent!.params.subscribe(
      (params) => {
        this.bankUserSubscription = this.bankUsersService.getBankUserByUserAccountNumber(params['userAccountNumber']).subscribe(
          (bankUser) => {
            this.bankUser = bankUser;
          }
        )
        this.savingAccountsSubscription = this.savingAccountsService.getSavingAccountsByAccountNumber(params['userAccountNumber']).subscribe(
          (savingAccounts) => {
            this.savingAccounts = savingAccounts;
            this.loading = false;
          }
        )
      }
    )
  }
  ngOnDestroy(): void {
    this.bankUserSubscription?.unsubscribe();
    this.savingAccountsSubscription?.unsubscribe();
  }

  onCloseAccount(accountNumber: string): void {
    if (confirm(`Do you confirm account ${accountNumber} closing?`)) {
      this.savingAccountsService.closeSavingAccountByAccountNumber(accountNumber).subscribe(
        {
          next: () => alert(`Saving Account ${accountNumber} has been closed`),
          error: (error) => alert(`Error occurred while closing saving Account ${accountNumber}: ${JSON.stringify(error)}`)
        }
      );
    }
  }

}
