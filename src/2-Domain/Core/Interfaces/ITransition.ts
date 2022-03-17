export interface ITransition{

    numberRequest: string;
    kind : TipoTransacao,
    amount: number,
    installments: number,
    cardholderName: string,
    cardNumber: string,
    expirationMonth: number,
    expirationYear: number,
    securityCode : string,
    softDescriptor: string,
}