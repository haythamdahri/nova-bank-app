import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Alert } from 'src/app/models/alert';
import { BankUser } from 'src/app/models/bank-user';
import { BankUsersService } from 'src/app/shared/bank-users.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit, OnDestroy {

  public bankUser?: BankUser;
  public formGroup!: FormGroup;
  private activatedRouteSubscription!: Subscription;
  private bankUserSubscription!: Subscription;
  private saveBankUserSubscription!: Subscription;
  public loading: boolean = true;
  public saving: boolean = false;
  public alert?: Alert;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private bankUsersService: BankUsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        userAccountNumber: new FormControl(this.bankUser?.userAccountNumber, []),
        firstName: new FormControl(this.bankUser?.firstName, [Validators.required]),
        lastName: new FormControl(this.bankUser?.lastName, [Validators.required]),
        email: new FormControl(this.bankUser?.email, [Validators.required]),
        address: new FormControl(this.bankUser?.address, [Validators.required]),
        birthDate: new FormControl(this.bankUser?.birthDate, [Validators.required]),
        city: new FormControl(this.bankUser?.city, [Validators.required]),
        country: new FormControl(this.bankUser?.country, [Validators.required]),
        job: new FormControl(this.bankUser?.job, [Validators.required]),
        averageIncome: new FormControl('', [])
      }
    );
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['userAccountNumber']) {
          this.bankUserSubscription = this.bankUsersService.getBankUserByUserAccountNumber(params['userAccountNumber']).pipe(take(1)).subscribe(
            (bankUser) => {
              this.bankUser = bankUser;
              this.formGroup.patchValue(
                {
                  userAccountNumber: this.bankUser?.userAccountNumber,
                  firstName: this.bankUser?.firstName,
                  lastName: this.bankUser?.lastName,
                  email: this.bankUser?.email,
                  address: this.bankUser?.address,
                  birthDate: `${this.bankUser?.birthDate.toString()?.split('/')[2]}-${this.bankUser?.birthDate.toString()?.split('/')[1]}-${this.bankUser?.birthDate.toString()?.split('/')[0]}`,
                  city: this.bankUser?.city,
                  country: this.bankUser?.country,
                  job: this.bankUser?.job
                }
              );
              this.formGroup.removeControl('averageIncome');
              this.loading = false;
            }
          );
        } else {
          this.loading = false;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe();
    this.bankUserSubscription?.unsubscribe();
    this.saveBankUserSubscription?.unsubscribe();
  }

  onBankUserSave(): void {
    if (this.formGroup.invalid) {
      console.error("Invalid user data", JSON.stringify(this.formGroup.errors));
      return;
    }
    this.saving = true;
    if (this.bankUser) {
      this.saveBankUserSubscription = this.bankUsersService.updateBankUser(this.formGroup.value).subscribe(
        (bankUser: BankUser) => {
          this.router.navigate(['account-form', bankUser.userAccountNumber]);
          this.saving = false;
          this.showAlert({type: 'primary', message: 'Client has been updated successfully'});
        },
        (err) => {
          this.saving = false;
          console.error(err);
          this.showAlert({type: 'danger', message: 'Error occured while updating client, please try again or check inputs'});
        }
      );
    } else {
      this.saveBankUserSubscription = this.bankUsersService.createBankUser(this.formGroup.value).subscribe(
        (bankUser: BankUser) => {
          this.router.navigate(['/accounts', bankUser.userAccountNumber]);
        },
        (err) => {
          this.saving = false;
          console.error(err);
          this.showAlert({type: 'danger', message: 'Error occured while creating client, please try again or check inputs'});
        }
      );
    }
  }

  showAlert(alert: Alert) {
    this.alert = alert;
    setTimeout(() => {
      this.alert = undefined;
    }, 3000)
  }

}
