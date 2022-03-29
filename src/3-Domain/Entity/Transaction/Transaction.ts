import { StatusTransaction } from '../../Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { TypeTransaction } from '../../Core/Interfaces/Transaction/Enum/TypeTransaction.enum.js';

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
    message: string;
}
