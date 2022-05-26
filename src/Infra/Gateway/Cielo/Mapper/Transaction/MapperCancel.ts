import { plainToInstance } from 'class-transformer';
import { CancelOrderDTOType } from '../../../../../Shared/DTO/Order/CancelOrderDTOType';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse';

export class MapperCancel {
    private constructor() {}

    static toCancelTransaction(Json: any): CancelOrderDTOType {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        return {
            nsu: object.ProofOfSale,
            tid: object.Tid,
            authorizationCode: object.AuthorizationCode,
            date: new Date(),
        };
    }
}
