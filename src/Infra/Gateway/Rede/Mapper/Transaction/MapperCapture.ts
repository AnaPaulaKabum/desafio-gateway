import { plainToInstance } from 'class-transformer';
import { CaptureOrderDTOType } from '../../../../../Domain/Shared/DTO/Order/CaptureOrderDTOType';
import { CaptureTransactionResponse } from '../../Response/CaptureTransactionResponse';

export class MapperCapture {
    static toCapture(Json: any, amountCapture: number): CaptureOrderDTOType {
        let object = plainToInstance(CaptureTransactionResponse, Json);

        const numberRequest = object.reference;
        const nsu = object.nsu;
        const date = object.dateTime;
        const authorizationCode = object.authorizationCode;
        const amount = amountCapture;

        return {
            numberRequest,
            nsu,
            date,
            authorizationCode,
            amount,
        };
    }
}
