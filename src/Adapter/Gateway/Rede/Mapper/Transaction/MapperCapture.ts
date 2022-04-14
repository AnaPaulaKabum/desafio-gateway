import { plainToInstance } from 'class-transformer';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CaptureOrder';
import { CaptureTransactionResponse } from '../../Response/CaptureTransactionResponse';

export abstract class MapperCapture {
    static toCapture(Json: any, amount: number): CaptureOrder {
        let object = plainToInstance(CaptureTransactionResponse, Json);

        const numberRequest = object.reference;
        const nsu = object.nsu;
        const date = object.dateTime;
        const authorizationCode = object.authorizationCode;

        return CaptureOrder.create(numberRequest, amount, date, nsu, authorizationCode);
    }
}
