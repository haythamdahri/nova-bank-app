export class TransactionsSearch {
    public accountNumber!: string;
    public startDateTime!: Date;
    public endDateTime!: Date;
    public operation!: string;

    public static getParams = (transactionsSearch: TransactionsSearch) => {
        const params: any= {};
        if (transactionsSearch.startDateTime) {
            params['startDateTime'] = transactionsSearch.startDateTime;
        }
        if (transactionsSearch.endDateTime) {
            params['endDateTime'] = transactionsSearch.endDateTime;
        }
        if (transactionsSearch.operation) {
            params['operation'] = transactionsSearch.operation;
        }
        return params;
    }
}