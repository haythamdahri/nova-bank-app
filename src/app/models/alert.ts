export class Alert {
    public type!: 'success' | 'danger' | 'primary' | 'secondary' | 'warning' | 'info' | 'light' | 'dark';
    public message!: string;
}