import { TransactionOrder } from './TransactionOrder';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';
import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';
import { CaptureOrder } from './CaptureOrder';

export class SearchTransactionOrder {
    /*;
    private _cancel: CancelOrder;
    private _cardNumber: string;*/

    private constructor(
        private readonly _transaction: TransactionOrder,
        private readonly _captureAmount: string,
        private readonly _captureDate: Date,
    ) {}

    static createForDTO(searchTransactionDTO: SearchTransactionOrderDTO): SearchTransactionOrder {
        return SearchTransactionOrder.create(
            searchTransactionDTO.transaction,
            searchTransactionDTO.captureAmount,
            searchTransactionDTO.captureDate,
        );
    }

    static create(transactionDTO: TransactionOrderDTO, captureAmount: string, captureDate: Date) {
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
        const searchTransaction = new SearchTransactionOrder(transaction, captureAmount, captureDate);

        return searchTransaction;
    }
}
