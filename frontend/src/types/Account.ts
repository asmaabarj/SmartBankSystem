export enum AccountType {
    CURRENT = 'CURRENT',
    SAVINGS = 'SAVINGS'
}

export interface Account {
    id?: number;
    type: AccountType;
    balance: number;
    customerId: number;
}