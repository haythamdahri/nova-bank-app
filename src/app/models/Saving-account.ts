import { Account } from "./account";

export class SavingAccount extends Account {
    public interestRate!: number;
    public riskLevel!: string;
}