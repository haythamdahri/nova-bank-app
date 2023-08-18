import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { Transaction } from '../models/transaction';
import { TransactionsSearch } from '../models/transactions-search';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient: HttpClient) { }

  getCheckingAccountTransactions(
    accountNumber: string, page: number = 0, size: number = 40, sort: string[] = ['operationDate'], direction: string = 'DESC'
  ): Observable<Page<Transaction>> {
    return this.httpClient.get<Page<Transaction>>(
            `/api/v1/transactions/checking-accounts/${accountNumber}`, 
            {params: new HttpParams().appendAll({page, size, sort, direction})}
    );
  }

  getCheckingAccountTransactionsBySearch(
    transactionsSearch: TransactionsSearch, page: number = 0, size: number = 40, sort: string[] = ['operationDate'], direction: string = 'DESC'
  ): Observable<Page<Transaction>> {
    return this.httpClient.get<Page<Transaction>>(
            `/api/v1/transactions/checking-accounts/${transactionsSearch.accountNumber}`, 
            {params: new HttpParams().appendAll({...TransactionsSearch.getParams(transactionsSearch), page, size, sort, direction})}
    );
  }

  getSavingAccountTransactions(
    accountNumber: string, page: number = 0, size: number = 40, sort: string[] = ['operationDate'], direction: string = 'DESC'
  ): Observable<Page<Transaction>> {
    return this.httpClient.get<Page<Transaction>>(
            `/api/v1/transactions/saving-accounts/${accountNumber}`, 
            {params: new HttpParams().appendAll({page, size, sort, direction})}
    );
  }

  getSavingAccountTransactionsBySearch(
    transactionsSearch: TransactionsSearch, page: number = 0, size: number = 40, sort: string[] = ['operationDate'], direction: string = 'DESC'
  ): Observable<Page<Transaction>> {
    return this.httpClient.get<Page<Transaction>>(
            `/api/v1/transactions/saving-accounts/${transactionsSearch.accountNumber}`, 
            {params: new HttpParams().appendAll({...TransactionsSearch.getParams(transactionsSearch), page, size, sort, direction})}
    );
  }

}
