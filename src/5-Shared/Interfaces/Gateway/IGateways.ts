import { TransactionDTO } from '../../DTO/TransactionDTO.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionComplete } from '../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { Capture } from '../../../3-Domain/Entity/Transaction/Capture.js';
import { Refund } from '../../../3-Domain/Entity/Transaction/Refund.js';
import { SearchRequest } from '../../../1-Application/Request/SearchRequest.js';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO.js';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<Transaction>;
    searchTransaction(searchRequest: SearchRequest): Promise<TransactionComplete>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<Capture>;
    cancelReversalTransaction(numberRequest: string): Promise<Refund>;
}
