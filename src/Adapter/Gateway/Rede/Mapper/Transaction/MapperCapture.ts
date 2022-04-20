import { plainToInstance } from 'class-transformer';
import { CaptureOrderDTO } from '../../../../../Shared/DTO/Order/CaptureOrderDTO';
import { CaptureTransactionResponse } from '../../Response/CaptureTransactionResponse';

export class MapperCapture {
    static toCapture(Json: any, amount: number): CaptureOrderDTO {
        let object = plainToInstance(CaptureTransactionResponse, Json);

        const captureOrderDTO = new CaptureOrderDTO();
        captureOrderDTO.numberRequest = object.reference;
        captureOrderDTO.nsu = object.nsu;
        captureOrderDTO.date = object.dateTime;
        captureOrderDTO.authorizationCode = object.authorizationCode;
        captureOrderDTO.amount = amount;

        return captureOrderDTO;
    }
}
