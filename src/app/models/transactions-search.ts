export class TransactionsSearch {
    public accountNumber!: string;
    public startDateTime!: Date;
    public endDateTime!: Date;

    public static getParams = (transactionsSearch: TransactionsSearch) => {
        const params: any= {};
        if (transactionsSearch.startDateTime) {
            params['startDateTime'] = transactionsSearch.startDateTime;
        }
        if (transactionsSearch.startDateTime) {
            params['endDateTime'] = transactionsSearch.endDateTime;
        }
        return params;
    }
}