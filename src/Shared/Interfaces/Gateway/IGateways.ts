import { TransactionDTO } from '../../DTO/TransactionDTO';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/ValueObject/CaptureOrder';
import { CancelOrder } from '../../../Domain/Entity/Transaction/ValueObject/CancelOrder';
import { SearchRequest } from '../../../Application/Request/SearchRequest';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrder>;
    searchTransaction(searchRequest: SearchRequest): Promise<SearchTransactionOrder>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder>;
    cancelReversalTransaction(numberRequest: string): Promise<CancelOrder>;
}
