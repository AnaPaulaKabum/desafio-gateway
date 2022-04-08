import { CancelReversalTransaction } from '../../2-Usecases/Transaction/CancelReversalTransaction.js';
import { CaptureTransaction } from '../../2-Usecases/Transaction/CaptureTransaction.js';
import { SearchTransaction } from '../../2-Usecases/Transaction/SearchTransaction.js';
import { SendTransaction } from '../../2-Usecases/Transaction/SendTransaction.js';
import { Transaction } from '../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionComplete } from '../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { CaptureOrder } from '../../3-Domain/Entity/Transaction/CaptureOrder.js';
import { RefundOrder } from '../../3-Domain/Entity/Transaction/RefundOrder.js';
import { TransactionRequest } from '../Request/TransactionRequest.js';
import { FactoryDTO } from '../Factory/FactoryDTO.js';
import { SearchRequest } from '../Request/SearchRequest.js';
import { CaptureRequest } from '../Request/CaptureRequest.js';

export class PaymentGatewaysController {
    constructor(
        private readonly sendTransaction: SendTransaction,
        private readonly searchTransaction: SearchTransaction,
        private readonly captureTransaction: CaptureTransaction,
        private readonly cancelReversalTransaction: CancelReversalTransaction,
    ) {}

    public async sendTransactions(createTransaction: TransactionRequest): Promise<Transaction> {
        console.log('.Controller');
        return await this.sendTransaction.execute(FactoryDTO.toTrasactionDTO(createTransaction));
    }

    public searchTransactions(searchRequest: SearchRequest): Promise<TransactionComplete> {
        console.log('.Controller');

        if (!searchRequest.numberRequest && !searchRequest.tid) {
            throw new Error('Parametros invalidos');
        }
        return this.searchTransaction.execute(FactoryDTO.toSearchDTO(searchRequest));
    }

    public captureTransactions(captureRequest: CaptureRequest): Promise<CaptureOrder> {
        console.log('.Controller');
        return this.captureTransaction.execute(FactoryDTO.toCaptureDTO(captureRequest));
    }

    public cancelReversalTransactions(paramNumberRequest: string): Promise<RefundOrder> {
        console.log('.Controller');
        return this.cancelReversalTransaction.execute(paramNumberRequest);
    }
}
