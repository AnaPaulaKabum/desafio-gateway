import { plainToInstance } from 'class-transformer';
import { CaptureCieloTransaction } from '../../Response/CaptureCieloTransactionResponse.js';
import { TransactionCieloCaptureRequest } from '../../Request/TransactionCieloCaptureRequest.js';
import { Capture } from '../../../../../3-Domain/Entity/Transaction/Capture.js';

export abstract class MapperCapture {
    static toCapture(Json: any, requestCapture: TransactionCieloCaptureRequest): Capture {
        let object = plainToInstance(CaptureCieloTransaction, Json);
        let capture = new Capture();

        capture.amount = requestCapture.amount;
        capture.numberRequest = requestCapture.paymentId;
        capture.nsu = object.ProofOfSale;
        capture.date = new Date();

        capture.isValid();
        return capture;
    }
}
