import { plainToInstance } from 'class-transformer';
import { Capture } from '../../../../../3-Domain/Entity/Transaction/Capture.js';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { CaptureTransactionResponse } from '../../Response/CaptureTransactionResponse.js';

export abstract class ReturnAPIToCaptureTransaction {
    static converte(Json: any): Capture {
        let object = plainToInstance(CaptureTransactionResponse, Json);

        let capture = new Capture();

        /*capture.tid = object.tid;
        capture.numberRequest = object.reference;
        capture.authorizationCode = object.authorizationCode;*/
        capture.nsu = object.nsu;

        return capture;
    }
}
