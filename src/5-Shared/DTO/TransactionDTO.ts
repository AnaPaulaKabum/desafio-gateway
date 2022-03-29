import { TypeTransaction } from '../../3-Domain/Core/Interfaces/Transaction/Enum/TypeTransaction.enum.js';

export class TransactionDTO {
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
