import { SearchRequest } from '../../../../Application/Request/SearchRequest';
import { CancelOrder } from '../../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../../Domain/Entity/Transaction/CaptureOrder';
import { SearchTransactionOrder } from '../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { TransactionOrder } from '../../../../Domain/Entity/Transaction/TransactionOrder';
import { CaptureTransactionDTO } from '../../../../Shared/DTO/CaptureTransactionDTO';
import { TransactionDTO } from '../../../../Shared/DTO/TransactionDTO';
import { StatusTransaction } from '../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Shared/Enum/TypeTransaction.enum';
import { IGateways } from '../../../../Shared/Interfaces/Gateway/IGateways';

export class GatewayMock implements IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        return new Promise(function (resolve) {
            const number = '100';
            const tid = '100';
            const kind = TypeTransaction.CREDIT;
            const authorizationCode = '100';
            const nsu = '100';
            const status = StatusTransaction.NO_CAPTURE;
            const amount = 100;
            const installments = 2;
            const message = 'Teste';
            resolve(
                TransactionOrder.create(
                    number,
                    tid,
                    kind,
                    status,
                    amount,
                    message,
                    nsu,
                    authorizationCode,
                    installments,
                ),
            );
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
