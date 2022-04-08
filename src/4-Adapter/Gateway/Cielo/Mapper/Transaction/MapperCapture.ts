import { plainToInstance } from 'class-transformer';
import { CaptureCieloTransaction } from '../../Response/CaptureCieloTransactionResponse.js';
import { TransactionCieloCaptureRequest } from '../../Request/TransactionCieloCaptureRequest.js';
import { CaptureOrder } from '../../../../../3-Domain/Entity/Transaction/CaptureOrder.js';

export abstract class MapperCapture {
    static toCapture(Json: any, requestCapture: TransactionCieloCaptureRequest): CaptureOrder {
        let object = plainToInstance(CaptureCieloTransaction, Json);
        let capture = new CaptureOrder();

        capture.amount = requestCapture.amount;
        capture.numberRequest = requestCapture.paymentId;
        capture.nsu = object.ProofOfSale;
        capture.date = new Date();

        capture.isValid();
        return capture;
    }
}
