import { CancelTransactionDTO } from '../../../Shared/DTO/CancelTransactionDTO';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { CancelOrderDTOType } from '../../../Shared/DTO/Order/CancelOrderDTOType';
import { CaptureOrderDTOType } from '../../../Shared/DTO/Order/CaptureOrderDTOType';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';
import { TransactionOrderDTOType } from '../../../Shared/DTO/Order/TransactionOrderDTOType';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';

export class GatewayMock implements IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTOType> {
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
    searchTransaction(searchTransactionDTO: SearchTransactionDTO): Promise<SearchTransactionOrderDTO> {
        return new Promise(function (resolve) {
            const searchTransactionOrderDTO = new SearchTransactionOrderDTO();
            searchTransactionOrderDTO.transaction = {
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
            searchTransactionOrderDTO.numberCreditCard = '123456789';
            resolve(searchTransactionOrderDTO);
        });
    }
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTOType> {
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
