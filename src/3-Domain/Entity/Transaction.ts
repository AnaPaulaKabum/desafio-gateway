import { StatusTransaction } from '../Core/Interfaces/Transaction/Enum/StatusTransaction';

export class Transaction {
    numberRequest: string;
    tid: string;
    kind: TypeTransaction;
    authorizationCode: string;
    nsu: string;
    status: StatusTransaction;
    amount: number;
    installments: number;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
    softDescriptor: string;
}
