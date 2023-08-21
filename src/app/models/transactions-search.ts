export class TransactionsSearch {
    public accountNumber!: string;
    public startDateTime!: Date;
    public endDateTime!: Date;
    public operation!: string;

    public static getParams = (transactionsSearch: TransactionsSearch) => {
        const excludedProperties = ['accountNumber'];
        return Object.entries(transactionsSearch)
            .filter(([key]) => !excludedProperties.includes(key))
            .reduce((params: any, [key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    params[key] = value;
                }
                return params;
            }, {});
    }
}