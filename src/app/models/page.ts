export class Page<T> {
    public content!: T[];
    public pageable!: Pageable;
    public totalPages!: number;
    public totalElements!: number;
    public last!: boolean;
    public size!: number;
    public number!: number;
    public sort!: Sort;
    public numberOfElements!: number;
    public first!: boolean;
    public empty!: boolean;
}

export class Pageable {
    public sort!: Sort;
    public offset!: number;
    public pageNumber!: number;
    public pageSize!: number;
    public paged!: boolean;
    public unpaged!: boolean;
}

export class Sort {
    public empty!: boolean;
    public unsorted!: boolean;
    public sorted!: boolean;
}