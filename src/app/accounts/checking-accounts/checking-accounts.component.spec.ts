import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingAccountsComponent } from './checking-accounts.component';

describe('CheckingAccountsComponent', () => {
  let component: CheckingAccountsComponent;
  let fixture: ComponentFixture<CheckingAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckingAccountsComponent]
    });
    fixture = TestBed.createComponent(CheckingAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
