import { plainToInstance } from 'class-transformer';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CaptureOrder';
import { CaptureTransactionResponse } from '../../Response/CaptureTransactionResponse';

export abstract class MapperCapture {
    static toCapture(Json: any, amount: number): CaptureOrder {
        let object = plainToInstance(CaptureTransactionResponse, Json);

        /*let capture = new CaptureOrder();

        capture.numberRequest = object.reference;
        capture.nsu = object.nsu;
        capture.date = object.dateTime;
        capture.amount = amount;

        capture.isValid();
        return capture;*/

        throw new Error('Implementar');
    }
}
