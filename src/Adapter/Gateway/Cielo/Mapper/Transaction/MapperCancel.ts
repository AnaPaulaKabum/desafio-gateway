import { plainToInstance } from 'class-transformer';
import { CancelOrderDTO } from '../../../../../Shared/DTO/Order/CancelOrderDTO';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse';

export class MapperCancel {
    private constructor() {}

    static toCancelTransaction(Json: any): CancelOrderDTO {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        const cancelOrderDTO = new CancelOrderDTO();
        cancelOrderDTO.nsu = object.ProofOfSale;
        cancelOrderDTO.tid = object.Tid;
        cancelOrderDTO.authorizationCode = object.AuthorizationCode;
        cancelOrderDTO.date = new Date();

        return cancelOrderDTO;
    }
}
