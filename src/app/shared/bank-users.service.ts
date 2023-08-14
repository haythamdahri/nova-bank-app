import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankUser } from '../models/bank-user';
import { EMPTY, Observable, catchError, repeat, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankUsersService {

  constructor(private httpClient: HttpClient) { }

  getBankUsers(search: string): Observable<BankUser[]> {
    return this.httpClient.get<BankUser[]>(`/api/v1/bank-users/`, {params: {"search": search}})
    .pipe(
      retry(5),
      catchError(() => EMPTY)
    )
  }

  getBankUserByUserAccountNumber(userAccountNumber: string): Observable<BankUser> {
    return this.httpClient.get<BankUser>(`/api/v1/bank-users/by-user-account-number/${userAccountNumber}`)
    .pipe(
      retry(5),
      repeat({delay: 5000}),
      catchError(() => EMPTY)
    )
  }

  createBankUser(request: any): Observable<BankUser> {
    return this.httpClient.post<BankUser>(`/api/v1/bank-users/`, request);
  }

  updateBankUser(request: any): Observable<BankUser> {
    return this.httpClient.put<BankUser>(`/api/v1/bank-users/`, request);
  }
}
