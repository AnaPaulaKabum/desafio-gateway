import { plainToInstance } from 'class-transformer';
import { CaptureCieloTransaction } from '../../Response/CaptureCieloTransactionResponse';
import { TransactionCieloCaptureRequest } from '../../Request/TransactionCieloCaptureRequest';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CaptureOrder';

export abstract class MapperCapture {
    static toCapture(Json: any, requestCapture: TransactionCieloCaptureRequest): CaptureOrder {
        let object = plainToInstance(CaptureCieloTransaction, Json);

        const amount = requestCapture.amount;
        const numberRequest = requestCapture.paymentId;
        const nsu = object.ProofOfSale;
        const date = new Date();

        return CaptureOrder.create(numberRequest, amount, date, nsu);
    }
}
