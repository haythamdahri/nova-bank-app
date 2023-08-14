import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckingAccount } from '../models/checking-account';
import { EMPTY, Observable, catchError, repeat, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckingAccountsService {

  constructor(private httpClient: HttpClient) { }

  getCheckingAccountsByAccountNumber(accountNumber: string): Observable<CheckingAccount[]> {
    return this.httpClient.get<CheckingAccount[]>(`/api/v1/checking-accounts/by-user-account-number/${accountNumber}`)
    .pipe(
      retry(5),
      repeat({delay: 10000}),
      catchError(() => EMPTY)
    )
  }

}
