import { CancelReversalTransaction } from '../../2-Usecases/Transaction/CancelReversalTransaction.js';
import { CaptureTransaction } from '../../2-Usecases/Transaction/CaptureTransaction.js';
import { SearchTransaction } from '../../2-Usecases/Transaction/SearchTransaction.js';
import { SendTransaction } from '../../2-Usecases/Transaction/SendTransaction.js';
import { Transaction } from '../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionComplete } from '../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { Capture } from '../../3-Domain/Entity/Transaction/Capture.js';
import { Refund } from '../../3-Domain/Entity/Transaction/Refund.js';
import { TransactionRequest } from '../Request/TransactionRequest.js';
import { MapperTransactionRequest } from '../Mapper/MapperTransactionRequest.js';
import { SearchRequest } from '../Request/SearchRequest.js';
import { CaptureRequest } from '../Request/CaptureRequest.js';
import { IValidateParamGateways } from '../../5-Shared/Interfaces/Gateway/IValidateParamGateways.js';

export class PaymentGatewaysController {
    constructor(
        private readonly sendTransaction: SendTransaction,
        private readonly searchTransaction: SearchTransaction,
        private readonly captureTransaction: CaptureTransaction,
        private readonly cancelReversalTransaction: CancelReversalTransaction,
        private readonly validateParamGateways: IValidateParamGateways,
    ) {}

    public async sendTransactions(createTransaction: TransactionRequest): Promise<Transaction> {
        console.log('.Controller');
        this.validateParamGateways.isValidSend(createTransaction);
        return await this.sendTransaction.execute(MapperTransactionRequest.toTrasactionDTO(createTransaction));
    }

    public searchTransactions(searchRequest: SearchRequest): Promise<TransactionComplete> {
        console.log('.Controller');
        return this.searchTransaction.execute(searchRequest.numberRequest);
    }

    public captureTransactions(captureRequest: CaptureRequest): Promise<Capture> {
        console.log('.Controller');
        return this.captureTransaction.execute(captureRequest.numberRequest, captureRequest.amount);
    }

    public cancelReversalTransactions(paramNumberRequest: string): Promise<Refund> {
        console.log('.Controller');
        return this.cancelReversalTransaction.execute(paramNumberRequest);
    }
}
