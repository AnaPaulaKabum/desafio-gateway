import { TypeTransaction } from '../../5-Shared/Enum/TypeTransaction.enum';

export class TransactionRequest {
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
