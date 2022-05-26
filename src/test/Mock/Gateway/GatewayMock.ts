import { CancelTransactionDTO } from '../../../Shared/DTO/CancelTransactionDTO';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { CancelOrderDTOType } from '../../../Shared/DTO/Order/CancelOrderDTOType';
import { CaptureOrderDTO } from '../../../Shared/DTO/Order/CaptureOrderDTO';
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
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTO> {
        return new Promise(function (resolve) {
            const capture = new CaptureOrderDTO();
            capture.amount = 100;
            capture.numberRequest = 'pedido123';
            capture.authorizationCode = '123';
            capture.nsu = '123';
            capture.date = new Date();
            resolve(capture);
        });
    }
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTOType> {
        return new Promise(function (resolve) {
            resolve({ date: new Date(), tid: '100', nsu: '100', authorizationCode: '100' });
        });
    }
}
