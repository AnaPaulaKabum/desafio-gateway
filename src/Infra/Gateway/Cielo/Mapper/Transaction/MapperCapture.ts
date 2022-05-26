import { plainToInstance } from 'class-transformer';
import { CaptureCieloTransaction } from '../../Response/CaptureCieloTransactionResponse';
import { CaptureTransactionDTO } from '../../../../../Shared/DTO/CaptureTransactionDTO';
import { CaptureOrderDTOType } from '../../../../../Shared/DTO/Order/CaptureOrderDTOType';

export class MapperCapture {
    private constructor() {}

    static toCapture(Json: any, captureDTO: CaptureTransactionDTO): CaptureOrderDTOType {
        let object = plainToInstance(CaptureCieloTransaction, Json);

        return {
            numberRequest: captureDTO.tid,
            nsu: object.ProofOfSale,
            authorizationCode: object.AuthorizationCode,
            date: new Date(),
        };
    }
}
