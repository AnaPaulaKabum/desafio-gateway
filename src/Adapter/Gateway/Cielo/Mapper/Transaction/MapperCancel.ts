import { plainToInstance } from 'class-transformer';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { CancelOrderDTO } from '../../../../../Shared/DTO/Order/CancelOrderDTO';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse';

export class MapperCancel {
    private constructor() {}

    static toCancelTransaction(Json: any, transactionOrder: TransactionOrder): CancelOrderDTO {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        const cancelOrderDTO = new CancelOrderDTO();

        cancelOrderDTO.numberRequest = transactionOrder.numberRequest;
        cancelOrderDTO.amount = transactionOrder.amount;
        cancelOrderDTO.nsu = object.ProofOfSale;
        cancelOrderDTO.tid = object.Tid;
        cancelOrderDTO.authorizationCode = object.AuthorizationCode;
        cancelOrderDTO.date = new Date();

        return cancelOrderDTO;
    }
}
