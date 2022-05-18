import { CaptureTransactionDTO } from '../../../../../Shared/DTO/CaptureTransactionDTO';
import { TransactionCieloCaptureRequest } from '../../Request/TransactionCieloCaptureRequest';

export class MapperCaptureTrasaction {
    private constructor() {}

    static generate(captureTransactionDTO: CaptureTransactionDTO): TransactionCieloCaptureRequest {
        let transactionCaptureRequest = new TransactionCieloCaptureRequest();
        transactionCaptureRequest.amount = captureTransactionDTO.amount;
        transactionCaptureRequest.paymentId = captureTransactionDTO.tid;

        return transactionCaptureRequest;
    }
}
