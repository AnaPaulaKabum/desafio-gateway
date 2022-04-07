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
    ) {
        if (amount <= 0) {
            throw new Error('Valor ' + amount + ' deverá ser positivo');
        }

        if (expirationMonth < 1 && expirationMonth > 12) {
            throw new Error('O mês deverá ser representando por 1 ao 12');
        }
    }
}
