export class BankUser {
    public firstName!: string;
    public lastName!: string;
    public userAccountNumber!: string;
    public email!: string;
    public address!: string;
    public birthDate!: Date;
    public city!: string;
    public country!: string;
    public job!: string;

    get fullName(): string {
        return this.firstName + " " + this.lastName;
    }
}