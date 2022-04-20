import { plainToInstance } from 'class-transformer';
import { CaptureCieloTransaction } from '../../Response/CaptureCieloTransactionResponse';
import { CaptureTransactionDTO } from '../../../../../Shared/DTO/CaptureTransactionDTO';
import { CaptureOrderDTO } from '../../../../../Shared/DTO/Order/CaptureOrderDTO';

export class MapperCapture {
    private constructor() {}

    static toCapture(Json: any, captureDTO: CaptureTransactionDTO): CaptureOrderDTO {
        let object = plainToInstance(CaptureCieloTransaction, Json);

        const captureOrderDTO = new CaptureOrderDTO();
        captureOrderDTO.numberRequest = captureDTO.numberRequest;
        captureOrderDTO.nsu = object.ProofOfSale;
        captureOrderDTO.authorizationCode = object.AuthorizationCode;
        captureOrderDTO.date = new Date();

        return captureOrderDTO;
    }
}
