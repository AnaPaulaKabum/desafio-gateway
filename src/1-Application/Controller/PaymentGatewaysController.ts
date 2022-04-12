import { CancelReversalTransaction } from '../../2-Usecases/Transaction/CancelReversalTransaction';
import { CaptureTransaction } from '../../2-Usecases/Transaction/CaptureTransaction';
import { SearchTransaction } from '../../2-Usecases/Transaction/SearchTransaction';
import { SendTransaction } from '../../2-Usecases/Transaction/SendTransaction';
import { TransactionOrder } from '../../3-Domain/Entity/Transaction/TransactionOrder';
import { SearchTransactionOrder } from '../../3-Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../3-Domain/Entity/Transaction/CaptureOrder';
import { RefundOrder } from '../../3-Domain/Entity/Transaction/RefundOrder';
import { TransactionRequest } from '../Request/TransactionRequest';
import { FactoryDTO } from '../Factory/FactoryDTO';
import { SearchRequest } from '../Request/SearchRequest';
import { CaptureRequest } from '../Request/CaptureRequest';

export class PaymentGatewaysController {
    constructor(
        private readonly sendTransaction: SendTransaction,
        private readonly searchTransaction: SearchTransaction,
        private readonly captureTransaction: CaptureTransaction,
        private readonly cancelReversalTransaction: CancelReversalTransaction,
    ) {}

    public async sendTransactions(createTransaction: TransactionRequest): Promise<TransactionOrder> {
        console.log('.Controller');
        return await this.sendTransaction.execute(FactoryDTO.toTrasactionDTO(createTransaction));
    }

    public searchTransactions(searchRequest: SearchRequest): Promise<SearchTransactionOrder> {
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
