import { CancelTransaction } from '../../Usecases/Transaction/CancelTransaction';
import { CaptureTransaction } from '../../Usecases/Transaction/CaptureTransaction';
import { SearchTransaction } from '../../Usecases/Transaction/SearchTransaction';
import { SendTransaction } from '../../Usecases/Transaction/SendTransaction';
import { TransactionOrder } from '../../Domain/Entity/Transaction/TransactionOrder';
import { SearchTransactionOrder } from '../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../Domain/Entity/Transaction/CaptureOrder';
import { CancelOrder } from '../../Domain/Entity/Transaction/CancelOrder';
import { TransactionRequest } from '../Request/TransactionRequest';
import { FactoryDTO } from '../Factory/FactoryDTO';
import { SearchRequest } from '../Request/SearchRequest';
import { CaptureRequest } from '../Request/CaptureRequest';
import { CancelRequest } from '../Request/CancelRequest';

export class PaymentGatewaysController {
    constructor(
        private readonly sendTransaction: SendTransaction,
        private readonly searchTransaction: SearchTransaction,
        private readonly captureTransaction: CaptureTransaction,
        private readonly cancelTransaction: CancelTransaction,
    ) {}

    public async sendTransactions(createTransaction: TransactionRequest): Promise<TransactionOrder> {
        return await this.sendTransaction.execute(FactoryDTO.toTrasactionDTO(createTransaction));
    }

    public searchTransactions(searchRequest: SearchRequest): Promise<SearchTransactionOrder> {
        if (!searchRequest.numberRequest && !searchRequest.tid) {
            throw new Error('Parametros invalidos');
        }
        return this.searchTransaction.execute(FactoryDTO.toSearchDTO(searchRequest));
    }

    public captureTransactions(captureRequest: CaptureRequest): Promise<CaptureOrder> {
        return this.captureTransaction.execute(FactoryDTO.toCaptureDTO(captureRequest));
    }

    public cancelReversalTransactions(cancelRequest: CancelRequest): Promise<CancelOrder> {
        return this.cancelTransaction.execute(FactoryDTO.toCancelDTO(cancelRequest));
    }
}
