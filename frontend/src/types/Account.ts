export enum AccountType {
    CURRENT = "CURRENT",
    SAVINGS = "SAVINGS"
}

export interface Account {
    id?: number;
    balance: number;
    type: AccountType;
    customerId: number;
}