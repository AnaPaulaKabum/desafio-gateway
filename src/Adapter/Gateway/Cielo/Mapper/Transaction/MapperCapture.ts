import { plainToInstance } from 'class-transformer';
import { CaptureCieloTransaction } from '../../Response/CaptureCieloTransactionResponse';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/CaptureOrder';
import { CaptureTransactionDTO } from '../../../../../Shared/DTO/CaptureTransactionDTO';

export class MapperCapture {
    private constructor() {}

    static toCapture(Json: any, captureDTO: CaptureTransactionDTO): CaptureOrder {
        let object = plainToInstance(CaptureCieloTransaction, Json);
        const nsu = object.ProofOfSale;
        const authorizationCode = object.AuthorizationCode;
        const date = new Date();

        return CaptureOrder.create(captureDTO.numberRequest, captureDTO.amount, date, nsu, authorizationCode);
    }
}
