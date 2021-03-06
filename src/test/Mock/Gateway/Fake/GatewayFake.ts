import { Transaction } from '../../../../Domain/Entity/Transaction/Transaction';
import { CancelTransactionDTOType } from '../../../../Domain/Shared/DTO/CancelTransactionDTOType';
import { CaptureTransactionDTOType } from '../../../../Domain/Shared/DTO/CaptureTransactionDTOType';
import { CancelOrderDTOType } from '../../../../Domain/Shared/DTO/Order/CancelOrderDTOType';
import { CaptureOrderDTOType } from '../../../../Domain/Shared/DTO/Order/CaptureOrderDTOType';
import { SearchTransactionOrderDTOType } from '../../../../Domain/Shared/DTO/Order/SearchTransactionOrderType';
import { TransactionOrderDTOType } from '../../../../Domain/Shared/DTO/Order/TransactionOrderDTOType';
import { SearchTransactionDTOType } from '../../../../Domain/Shared/DTO/SearchTransactionDTOType';
import { StatusTransaction } from '../../../../Domain/Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Domain/Shared/Enum/TypeTransaction.enum';
import { IGateways } from '../../../../Domain/Shared/Interfaces/Gateway/IGateways';

export class GatewayFake implements IGateways {
    sendTransaction(transaction: Transaction): Promise<TransactionOrderDTOType> {
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
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTOType): Promise<CancelOrderDTOType> {
        return new Promise(function (resolve) {
            resolve({ date: new Date(), tid: '100', nsu: '100', authorizationCode: '100' });
        });
    }
}
