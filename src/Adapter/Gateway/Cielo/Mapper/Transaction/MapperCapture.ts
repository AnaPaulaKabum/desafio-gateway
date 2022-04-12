import { plainToInstance } from 'class-transformer';
import { CaptureCieloTransaction } from '../../Response/CaptureCieloTransactionResponse';
import { TransactionCieloCaptureRequest } from '../../Request/TransactionCieloCaptureRequest';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CaptureOrder';

export abstract class MapperCapture {
    static toCapture(Json: any, requestCapture: TransactionCieloCaptureRequest): CaptureOrder {
        let object = plainToInstance(CaptureCieloTransaction, Json);
        /*let capture = new CaptureOrder();

        capture.amount = requestCapture.amount;
        capture.numberRequest = requestCapture.paymentId;
        capture.nsu = object.ProofOfSale;
        capture.date = new Date();

        capture.isValid();
        return capture;*/

        throw new Error('Implementar');
    }
}
