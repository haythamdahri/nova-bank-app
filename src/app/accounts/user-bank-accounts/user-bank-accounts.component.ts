import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BankUser } from 'src/app/models/bank-user';
import { BankUsersService } from 'src/app/shared/bank-users.service';

@Component({
  selector: 'app-user-bank-accounts',
  templateUrl: './user-bank-accounts.component.html',
  styleUrls: ['./user-bank-accounts.component.css']
})
export class UserBankAccountsComponent implements OnInit, OnDestroy {

  bankUserSubscription!: Subscription;
  checkingAccountsSubscription!: Subscription;
  savingAccountsSubscription!: Subscription;
  paramsSubscription!: Subscription;
  bankUser?: BankUser;
  loading: boolean = true;

  constructor(
    private bankUsersService: BankUsersService,
    private activatedRoute: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.bankUserSubscription = this.bankUsersService.getBankUserByUserAccountNumber(params['userAccountNumber']).subscribe(
          (bankUser) => {
            this.bankUser = bankUser;
            this.loading = false;
          }
        )
      }
    )
  }
  
  ngOnDestroy(): void {
    this.bankUserSubscription?.unsubscribe();
  }

}
