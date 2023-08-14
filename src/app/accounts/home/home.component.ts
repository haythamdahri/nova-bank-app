import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BankUser } from 'src/app/models/bank-user';
import { BankUsersService } from 'src/app/shared/bank-users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit, OnDestroy {

  bankUserSubscription?: Subscription;
  paramsSubscription!: Subscription;
  bankUser?: BankUser;
  loading: boolean = true;

  constructor(
    private bankUsersService: BankUsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

  onCheckingAccountsNavigation(): void {
    console.log(this.bankUser?.userAccountNumber)
    this.router.navigate(['/accounts', this.bankUser?.userAccountNumber, 'checking-accounts']);
  }

  onSavingAccountsNavigation(): void {
    this.router.navigate(['/accounts', this.bankUser?.userAccountNumber, 'saving-accounts']);
  }

  onTransactionsNavigation(): void {
    this.router.navigate(['/accounts', this.bankUser?.userAccountNumber, 'transactions']);
  }

}
