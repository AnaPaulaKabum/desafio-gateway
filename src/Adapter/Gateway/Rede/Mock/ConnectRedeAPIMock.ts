import { CancelTransactionDTO } from '../../../../Shared/DTO/CancelTransactionDTO';
import { CaptureTransactionDTO } from '../../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTO } from '../../../../Shared/DTO/TransactionDTO';
import { IConnectRedeAPI } from '../Interface/IConnectRedeAPI';
import { MapperTrasactionRede } from '../Mapper/Transaction/MapperTrasactionRede';
import { MockAPICancelRede } from './ReturnAPI/MockAPICancelRede';
import { MockAPICaptureRede } from './ReturnAPI/MockAPICaptureRede';
import { MockAPISearchRede } from './ReturnAPI/MockAPISearchRede';
import { MockAPISendRede } from './ReturnAPI/MockAPISendRede';

export class ConnectRedeAPIMock implements IConnectRedeAPI {
    sendTransaction(transaction: TransactionDTO): Promise<any> {
        const transactionRedeRequest = MapperTrasactionRede.toTransactionRede(transaction);
        return MockAPISendRede.send(transactionRedeRequest);
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
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<any> {
        return MockAPICancelRede.cancel(cancelTransactionDTO);
    }
}
