import { plainToInstance } from 'class-transformer';
import { Capture } from '../../../../../3-Domain/Entity/Transaction/Capture.js';
import { CaptureTransactionResponse } from '../../Response/CaptureTransactionResponse.js';

export abstract class MapperCapture {
    static toCapture(Json: any, amount: number): Capture {
        let object = plainToInstance(CaptureTransactionResponse, Json);

        let capture = new Capture();

        capture.numberRequest = object.reference;
        capture.nsu = object.nsu;
        capture.date = object.dateTime;
        capture.amount = amount;

        capture.isValid();
        return capture;
    }
}
