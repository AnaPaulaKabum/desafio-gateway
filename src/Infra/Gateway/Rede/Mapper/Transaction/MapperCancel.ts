import { plainToInstance } from 'class-transformer';
import { CancelOrderDTO } from '../../../../../Shared/DTO/Order/CancelOrderDTO';
import { CancelTransactionResponse } from '../../Response/CancelTransactionResponse';

export class MapperCancel {
    private constructor() {}

    static toCancelTransaction(Json: any): CancelOrderDTO {
        let object = plainToInstance(CancelTransactionResponse, Json);

        let cancelOrderDTO = new CancelOrderDTO();
        cancelOrderDTO.tid = object.tid;
        cancelOrderDTO.nsu = object.nsu;
        cancelOrderDTO.date = object.refundDateTime;
        cancelOrderDTO.authorizationCode = object.refundId;

        return cancelOrderDTO;
    }
}
