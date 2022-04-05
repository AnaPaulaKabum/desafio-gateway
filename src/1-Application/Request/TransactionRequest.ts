import { TypeTransaction } from '../../5-Shared/Enum/TypeTransaction.enum';

export class TransactionRequest {
    constructor(
        readonly numberRequest: string,
        readonly kind: TypeTransaction,
        readonly amount: number,
        readonly installments: number,
        readonly cardHolderName: string,
        readonly cardNumber: string,
        readonly expirationMonth: number,
        readonly expirationYear: number,
        readonly securityCode: string,
        readonly softDescriptor: string,
    ) {
        if (amount <= 0) {
            throw new Error('Valor ' + amount + ' deverá ser positivo');
        }

        if (expirationMonth < 1 && expirationMonth > 12) {
            throw new Error('O mês deverá ser representando por 1 ao 12');
        }
    }
}
