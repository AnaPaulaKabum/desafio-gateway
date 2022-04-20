import { CaptureTransactionDTO } from '../../../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../../../Shared/DTO/SearchTransactionDTO';
import { IConnectRedeAPI } from '../../Interface/IConnectRedeAPI';
import { TransactionRedeCreateRequest } from '../../Request/TransactionRedeCreateRequest';
import { MockAPICancelRede } from './MockAPICancelRede';
import { MockAPICaptureRede } from './MockAPICaptureRede';
import { MockAPISearchRede } from './MockAPISearchRede';
import { MockAPISendRede } from './MockAPISendRede';

export class ConnectRedeAPIMock implements IConnectRedeAPI {
    sendTransaction(transaction: TransactionRedeCreateRequest): Promise<any> {
        return MockAPISendRede.send(transaction);
    }
    searchTransaction(searchRequest: SearchTransactionDTO): Promise<any> {
        if (searchRequest.numberRequest) {
            return MockAPISearchRede.searchNumberRequest(searchRequest.numberRequest);
        }

        return MockAPISearchRede.searchTid(searchRequest.tid);
    }
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<any> {
        return MockAPICaptureRede.capture(captureTransactionDTO.numberRequest, captureTransactionDTO.amount);
    }
    cancelTransaction(numberRequest: string): Promise<any> {
        return MockAPICancelRede.cancel(numberRequest);
    }
}
