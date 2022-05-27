import { CaptureTransactionDTOType } from '../../../../../Shared/DTO/CaptureTransactionDTOType';
import { TransactionCieloCaptureRequest } from '../../Request/TransactionCieloCaptureRequest';

export class MapperCaptureTrasaction {
    private constructor() {}

    static generate(captureTransactionDTO: CaptureTransactionDTOType): TransactionCieloCaptureRequest {
        let transactionCaptureRequest = new TransactionCieloCaptureRequest();
        transactionCaptureRequest.amount = captureTransactionDTO.amount;
        transactionCaptureRequest.paymentId = captureTransactionDTO.tid;

        return transactionCaptureRequest;
    }
}
