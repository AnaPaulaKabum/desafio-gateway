import { TransactionOrder } from './TransactionOrder';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';
import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';

export class SearchTransactionOrder {
    private constructor(
        private readonly _transaction: TransactionOrder,
        private readonly _captureAmount: number,
        private readonly _captureDate: Date,
        private readonly _cancelAmount: number,
        private readonly _cancelDate: Date,
    ) {}

    static createForDTO(searchTransactionDTO: SearchTransactionOrderDTO): SearchTransactionOrder {
        return SearchTransactionOrder.create(
            searchTransactionDTO.transaction,
            searchTransactionDTO.captureAmount,
            searchTransactionDTO.captureDate,
            searchTransactionDTO.cancelAmount,
            searchTransactionDTO.cancelDate,
        );
    }

    static create(
        transactionDTO: TransactionOrderDTO,
        captureAmount: number,
        captureDate: Date,
        cancelAmount: number,
        cancelDate: Date,
    ) {
        const transaction = TransactionOrder.create(
            transactionDTO.numberRequest,
            transactionDTO.tid,
            transactionDTO.kind,
            transactionDTO.status,
            transactionDTO.amount,
            transactionDTO.message,
            transactionDTO.nsu,
            transactionDTO.authorizationCode,
            transactionDTO.installments,
        );

        if (captureAmount > 0) {
            if (!captureAmount) throw new Error('Campo captureAmount é obrigatório');
            if (!captureDate) throw new Error('Campo captureDate é obrigatório');
        }
        const searchTransaction = new SearchTransactionOrder(
            transaction,
            captureAmount,
            captureDate,
            cancelAmount,
            cancelDate,
        );

        return searchTransaction;
    }
}
