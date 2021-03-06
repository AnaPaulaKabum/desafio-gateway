import { plainToInstance } from 'class-transformer';
import { CaptureCieloTransaction } from '../../Response/CaptureCieloTransactionResponse';
import { CaptureTransactionDTOType } from '../../../../../Domain/Shared/DTO/CaptureTransactionDTOType';
import { CaptureOrderDTOType } from '../../../../../Domain/Shared/DTO/Order/CaptureOrderDTOType';

export class MapperCapture {
    static toCapture(Json: any, captureDTO: CaptureTransactionDTOType): CaptureOrderDTOType {
        let object = plainToInstance(CaptureCieloTransaction, Json);

        return {
            numberRequest: captureDTO.tid,
            nsu: object.ProofOfSale,
            authorizationCode: object.AuthorizationCode,
            date: new Date(),
        };
    }
}
