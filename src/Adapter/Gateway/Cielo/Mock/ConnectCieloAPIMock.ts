import { CaptureTransactionDTO } from '../../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTO } from '../../../../Shared/DTO/TransactionDTO';
import { TypeTransaction } from '../../../../Shared/Enum/TypeTransaction.enum';
import { IConnectCieloAPI } from '../Interface/IConnectCieloAPI';
import { MapperCaptureTrasaction } from '../Mapper/Transaction/MapperCaptureTrasaction';
import { MapperTransactionCielo } from '../Mapper/Transaction/MapperTransactionCielo';
import { MockAPICaptureCielo } from './ReturnAPI/MockAPICaptureCielo';
import { MockAPIReversalCielo } from './ReturnAPI/MockAPIReversalCielo';
import { MockAPISearchCielo } from './ReturnAPI/MockAPISearchCielo';
import { MockAPISendCielo } from './ReturnAPI/MockAPISendCielo';

export class ConnectCieloAPIMock implements IConnectCieloAPI {
    sendTransaction(transaction: TransactionDTO): Promise<any> {
        if (transaction.kind === TypeTransaction.CREDIT) {
            const transactionRedeRequest = MapperTransactionCielo.generateCredit(transaction);
            return MockAPISendCielo.sendCredit(transactionRedeRequest);
        }

        const transactionRedeRequest = MapperTransactionCielo.generateDebit(transaction);
        return MockAPISendCielo.sendDebit(transactionRedeRequest);
    }
    searchTransaction(searchRequest: SearchTransactionDTO): Promise<any> {
        if (searchRequest.numberRequest) {
            return MockAPISearchCielo.searchToNumberRequest(searchRequest.numberRequest);
        }

        return MockAPISearchCielo.searchToTid(searchRequest.tid);
    }
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<any> {
        let transactionCaptureRequest = MapperCaptureTrasaction.generate(captureTransactionDTO);
        return MockAPICaptureCielo.captureTotal(transactionCaptureRequest);
    }
    cancelTransaction(numberRequest: string): Promise<any> {
        return MockAPIReversalCielo.cancel(numberRequest);
    }
}
