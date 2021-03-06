import { CancelTransactionDTOType } from '../../../../Domain/Shared/DTO/CancelTransactionDTOType';
import { CaptureTransactionDTOType } from '../../../../Domain/Shared/DTO/CaptureTransactionDTOType';
import { SearchTransactionDTOType } from '../../../../Domain/Shared/DTO/SearchTransactionDTOType';
import { TransactionDTOType } from '../../../../Domain/Shared/DTO/TransactionDTOType';
import { TypeTransaction } from '../../../../Domain/Shared/Enum/TypeTransaction.enum';
import { IConnectCieloAPI } from '../Interface/IConnectCieloAPI';
import { MapperCaptureTrasaction } from '../Mapper/Transaction/MapperCaptureTrasaction';
import { MapperTransactionCielo } from '../Mapper/Transaction/MapperTransactionCielo';
import { MockAPICaptureCielo } from './ReturnAPI/MockAPICaptureCielo';
import { MockAPIReversalCielo } from './ReturnAPI/MockAPIReversalCielo';
import { MockAPISearchCielo } from './ReturnAPI/MockAPISearchCielo';
import { MockAPISendCielo } from './ReturnAPI/MockAPISendCielo';

export class ConnectCieloAPIMock implements IConnectCieloAPI {
    sendTransaction(transaction: TransactionDTOType): Promise<any> {
        if (transaction.kind === TypeTransaction.CREDIT) {
            const transactionRedeRequest = MapperTransactionCielo.generateCredit(transaction);
            return MockAPISendCielo.sendCredit(transactionRedeRequest);
        }

        const transactionRedeRequest = MapperTransactionCielo.generateDebit(transaction);
        return MockAPISendCielo.sendDebit(transactionRedeRequest);
    }
    searchTransaction(searchRequest: SearchTransactionDTOType): Promise<any> {
        if (searchRequest.numberRequest) {
            return MockAPISearchCielo.searchToNumberRequest(searchRequest.numberRequest);
        }

        return MockAPISearchCielo.searchToTid(searchRequest.tid || '');
    }
    captureTransaction(captureTransactionDTO: CaptureTransactionDTOType): Promise<any> {
        let transactionCaptureRequest = MapperCaptureTrasaction.generate(captureTransactionDTO);
        return MockAPICaptureCielo.captureTotal(transactionCaptureRequest);
    }
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTOType): Promise<any> {
        return MockAPIReversalCielo.cancel(cancelTransactionDTO);
    }
}
