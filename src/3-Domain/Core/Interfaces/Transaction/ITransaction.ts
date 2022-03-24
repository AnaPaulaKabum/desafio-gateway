export interface ITransaction{

    numberRequest: string;
    kind : TypeTransaction,
    amount: number,
    installments: number,
    cardholderName: string,
    cardNumber: string,
    expirationMonth: number,
    expirationYear: number,
    securityCode : string,
    softDescriptor: string,
}