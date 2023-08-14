import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SavingAccount } from 'src/app/models/Saving-account';
import { BankUser } from 'src/app/models/bank-user';
import { CheckingAccount } from 'src/app/models/checking-account';
import { BankUsersService } from 'src/app/shared/bank-users.service';
import { CheckingAccountsService } from 'src/app/shared/checking-accounts.service';

@Component({
  selector: 'app-checking-accounts',
  templateUrl: './checking-accounts.component.html',
  styleUrls: ['./checking-accounts.component.css']
})
export class CheckingAccountsComponent implements OnInit, OnDestroy {

  bankUserSubscription!: Subscription;
  checkingAccountsSubscription!: Subscription;
  paramsSubscription!: Subscription;
  bankUser?: BankUser;
  checkingAccounts?: CheckingAccount[] = [];
  savingAccounts?: SavingAccount[] = [];
  loading: boolean = true;

  constructor(
    private bankUsersService: BankUsersService,
    private checkingAccountsService: CheckingAccountsService,
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
        this.checkingAccountsSubscription = this.checkingAccountsService.getCheckingAccountsByAccountNumber(params['userAccountNumber']).subscribe(
          (checkingAccounts) => {
            this.checkingAccounts = checkingAccounts;
            this.loading = false;
          }
        )
      }
    )
  }
  ngOnDestroy(): void {
    this.bankUserSubscription?.unsubscribe();
    this.checkingAccountsSubscription?.unsubscribe();
  }

}
