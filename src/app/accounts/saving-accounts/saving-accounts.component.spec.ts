import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingAccountsComponent } from './saving-accounts.component';

describe('SavingAccountsComponent', () => {
  let component: SavingAccountsComponent;
  let fixture: ComponentFixture<SavingAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingAccountsComponent]
    });
    fixture = TestBed.createComponent(SavingAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
