import { ITransaction } from "../../3-Domain/Core/Interfaces/Transaction/ITransaction.js";

export class CreateTransactionRequest implements ITransaction{

    numberRequest: string;
    kind: TypeTransaction;
    amount: number;
    installments: number;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
    softDescriptor: string;
}