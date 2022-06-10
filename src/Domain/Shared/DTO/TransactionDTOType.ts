import { TypeTransaction } from '../Enum/TypeTransaction.enum';

export type TransactionDTOType = {
    numberRequest: string;
    kind: TypeTransaction;
    amount: string;
    installments: number;
    cardHolderName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    cardSecurityCode: string;
    softDescriptor: string;
};
