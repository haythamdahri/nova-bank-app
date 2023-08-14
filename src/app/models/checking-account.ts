import { Account } from "./account";

export class CheckingAccount extends Account {
    public authorizedOverdraftAmount!: number;
    public riskLevel!: string;
}