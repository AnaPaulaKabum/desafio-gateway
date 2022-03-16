export interface ITransacao{

    numPedido:string;
    kind : TipoTransacao,
    reference: string,
    amount: number,
    installments: number,
    cardholderName: string,
    cardNumber: string,
    expirationMonth: number,
    expirationYear: number,
    securityCode : string,
    softDescriptor: string,
}