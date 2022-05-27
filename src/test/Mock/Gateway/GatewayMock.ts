import { CancelTransactionDTO } from '../../../Shared/DTO/CancelTransactionDTO';
import { CaptureTransactionDTOType } from '../../../Shared/DTO/CaptureTransactionDTOType';
import { CancelOrderDTOType } from '../../../Shared/DTO/Order/CancelOrderDTOType';
import { CaptureOrderDTOType } from '../../../Shared/DTO/Order/CaptureOrderDTOType';
import { SearchTransactionOrderDTOType } from '../../../Shared/DTO/Order/SearchTransactionOrderType';
import { TransactionOrderDTOType } from '../../../Shared/DTO/Order/TransactionOrderDTOType';
import { SearchTransactionDTOType } from '../../../Shared/DTO/SearchTransactionDTOType';
import { TransactionDTOType } from '../../../Shared/DTO/TransactionDTOType';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';

export class GatewayMock implements IGateways {
    sendTransaction(transaction: TransactionDTOType): Promise<TransactionOrderDTOType> {
        return new Promise(function (resolve) {
            resolve({
                numberRequest: '100',
                tid: '100',
                kind: TypeTransaction.CREDIT,
                authorizationCode: '100',
                nsu: '100',
                status: StatusTransaction.NO_CAPTURE,
                amount: 100,
                installments: 2,
                message: 'Teste',
            });
        });
    }
    searchTransaction(searchTransactionDTO: SearchTransactionDTOType): Promise<SearchTransactionOrderDTOType> {
        return new Promise(function (resolve) {
            const transaction = {
                numberRequest: '100',
                tid: '100',
                kind: TypeTransaction.CREDIT,
                authorizationCode: '100',
                nsu: '100',
                status: StatusTransaction.NO_CAPTURE,
                amount: 100,
                installments: 2,
                message: 'Teste',
            };
            const numberCreditCard = '123456789';
            resolve({ transaction, numberCreditCard });
        });
    }
    captureTransaction(captureTransactionDTO: CaptureTransactionDTOType): Promise<CaptureOrderDTOType> {
        return new Promise(function (resolve) {
            resolve({
                amount: 100,
                numberRequest: 'pedido123',
                authorizationCode: '123',
                nsu: '123',
                date: new Date(),
            });
        });
    }
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTOType> {
        return new Promise(function (resolve) {
            resolve({ date: new Date(), tid: '100', nsu: '100', authorizationCode: '100' });
        });
    }
}
