import { ITransaction } from "../Core/Interfaces/Transaction/ITransaction.js";

export class Transaction implements ITransaction{

    numberRequest: string;
    tid:string;
    kind: TypeTransaction;
    authorizationCode:string
    nsu:string;
    status:string;
    amount: number;
    installments: number;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
    softDescriptor: string;
}