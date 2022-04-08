import { TypeTransaction } from '../../5-Shared/Enum/TypeTransaction.enum';

export class TransactionRequest {
    constructor(
        public numberRequest: string,
        public kind: TypeTransaction,
        public amount: number,
        public installments: number,
        public cardHolderName: string,
        public cardNumber: string,
        public expirationMonth: number,
        public expirationYear: number,
        public cardSecurityCode: string,
        public softDescriptor: string,
    ) {}
}
