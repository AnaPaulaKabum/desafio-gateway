import { SearchRequest } from '../../../Application/Request/SearchRequest';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { CancelOrderDTO } from '../../../Shared/DTO/Order/CancelOrderDTO';
import { CaptureOrderDTO } from '../../../Shared/DTO/Order/CaptureOrderDTO';
import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';

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
    cancelTransaction(numberRequest: string): Promise<CancelOrderDTO> {
        const cancelOrderDTO = new CancelOrderDTO();

        cancelOrderDTO.date = new Date();
        cancelOrderDTO.tid = '100';
        cancelOrderDTO.nsu = '100';
        cancelOrderDTO.authorizationCode = '100';

        return new Promise(function (resolve) {
            resolve(cancelOrderDTO);
        });
    }
}
