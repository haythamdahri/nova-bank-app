import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, repeat, retry } from 'rxjs';
import { SavingAccount } from '../models/Saving-account';

@Injectable({
  providedIn: 'root'
})
export class SavingAccountsService {

  constructor(private httpClient: HttpClient) { }

  getSavingAccountsByAccountNumber(accountNumber: string): Observable<SavingAccount[]> {
    return this.httpClient.get<SavingAccount[]>(`/api/v1/saving-accounts/by-user-account-number/${accountNumber}`)
    .pipe(
      retry(5),
      repeat({delay: 10000}),
      catchError(() => EMPTY)
    )
  }

  closeSavingAccountByAccountNumber(accountNumber: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/v1/saving-accounts/closing/${accountNumber}`)
    .pipe(
      retry(5)    
    )
  }
}
