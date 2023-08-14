import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBankAccountsComponent } from './user-bank-accounts.component';

describe('UserBankAccountsComponent', () => {
  let component: UserBankAccountsComponent;
  let fixture: ComponentFixture<UserBankAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBankAccountsComponent]
    });
    fixture = TestBed.createComponent(UserBankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
