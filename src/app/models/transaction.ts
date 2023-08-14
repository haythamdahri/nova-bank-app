export abstract class Transaction {
    public operation!: string;
    public operationDate!: Date;
    public amount!: number;
    public accountNumber!: string;
}