import { SearchRequest } from '../../../../Application/Request/SearchRequest';
import { CancelOrder } from '../../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../../Domain/Entity/Transaction/CaptureOrder';
import { SearchTransactionOrder } from '../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { TransactionOrder } from '../../../../Domain/Entity/Transaction/TransactionOrder';
import { CaptureTransactionDTO } from '../../../../Shared/DTO/CaptureTransactionDTO';
import { TransactionOrderDTO } from '../../../../Shared/DTO/Order/TransactionOrderDTO';
import { TransactionDTO } from '../../../../Shared/DTO/TransactionDTO';
import { StatusTransaction } from '../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Shared/Enum/TypeTransaction.enum';
import { IGateways } from '../../../../Shared/Interfaces/Gateway/IGateways';

export class GatewayMock implements IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTO> {
        return new Promise(function (resolve) {
            const transactionOrderDTO = new TransactionOrderDTO();

            transactionOrderDTO.numberRequest = '100';
            transactionOrderDTO.tid = '100';
            transactionOrderDTO.kind = TypeTransaction.CREDIT;
            transactionOrderDTO.authorizationCode = '100';
            transactionOrderDTO.nsu = '100';
            transactionOrderDTO.status = StatusTransaction.NO_CAPTURE;
            transactionOrderDTO.amount = 100;
            transactionOrderDTO.installments = 2;
            transactionOrderDTO.message = 'Teste';
            resolve(transactionOrderDTO);
        });
    }
    searchTransaction(searchRequest: SearchRequest): Promise<SearchTransactionOrder> {
        throw new Error('Method not implemented - searchTransaction');
    }
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder> {
        throw new Error('Method not implemented - captureTransaction');
    }
    cancelTransaction(numberRequest: string): Promise<CancelOrder> {
        const date = new Date();
        const amount = 100;
        const tid = '100';
        const nsu = '100';
        const authorizationCode = '100';

        return new Promise(function (resolve) {
            resolve(CancelOrder.create(numberRequest, date, amount, tid, nsu, authorizationCode));
        });
    }
}
