import { TransactionOrder } from './TransactionOrder';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';

export class SearchTransactionOrder {
    constructor(
        private readonly _transaction: TransactionOrder,
        private readonly _captureAmount: number,
        private readonly _captureDate: Date,
        private readonly _cancelAmount: number,
        private readonly _cancelDate: Date,
        private readonly _numberCreditCard: string,
    ) {
        if (!_numberCreditCard) throw new Error('Campo numberCreditCard é obrigatório');

        if (_captureAmount > 0) {
            if (!_captureAmount) throw new Error('Campo captureAmount é obrigatório');
            if (!_captureDate) throw new Error('Campo captureDate é obrigatório');
        }

        if (_cancelAmount > 0) {
            if (!_cancelAmount) throw new Error('Campo cancelAmount é obrigatório');
            if (!_cancelDate) throw new Error('Campo cancelDate é obrigatório');
        }
    }

    static createForDTO(searchTransactionDTO: SearchTransactionOrderDTO): SearchTransactionOrder {
        const transactionOrder = TransactionOrder.createForDTO(searchTransactionDTO.transaction);

        return new SearchTransactionOrder(
            transactionOrder,
            searchTransactionDTO.captureAmount,
            searchTransactionDTO.captureDate,
            searchTransactionDTO.cancelAmount,
            searchTransactionDTO.cancelDate,
            searchTransactionDTO.numberCreditCard,
        );
    }
}
