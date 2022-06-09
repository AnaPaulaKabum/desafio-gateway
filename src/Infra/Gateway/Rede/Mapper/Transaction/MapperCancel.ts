import { plainToInstance } from 'class-transformer';
import { CancelOrderDTOType } from '../../../../../Domain/Shared/DTO/Order/CancelOrderDTOType';
import { CancelTransactionResponse } from '../../Response/CancelTransactionResponse';

export class MapperCancel {
    private constructor() {}

    static toCancelTransaction(Json: any): CancelOrderDTOType {
        let object = plainToInstance(CancelTransactionResponse, Json);

        return { tid: object.tid, date: object.refundDateTime, nsu: object.nsu, authorizationCode: object.refundId };
    }
}
