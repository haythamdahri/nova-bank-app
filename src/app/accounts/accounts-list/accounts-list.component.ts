import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BankUser } from 'src/app/models/bank-user';
import { BankUsersService } from 'src/app/shared/bank-users.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit, OnDestroy {
  private bankUsersSubscription!: Subscription;
  bankUsers!: BankUser[];
  search?: string = "";

  constructor(private bankUsersService: BankUsersService) {}

  ngOnInit(): void {
    this.searchUsers();
  }

  ngOnDestroy(): void {
    this.bankUsersSubscription?.unsubscribe();
  }

  private searchUsers(): void {
    this.bankUsersSubscription = this.bankUsersService.getBankUsers(this.search || "").subscribe(
      (bankUsers) => this.bankUsers = bankUsers,
      (error) => {
        alert(`Error while retrieving bank users: ${error}`);
      }
    );
  }

  onSearch(): void {
    this.searchUsers();
  }

}
