import { plainToInstance } from 'class-transformer';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/CancelOrder';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { CancelOrderDTO } from '../../../../../Shared/DTO/Order/CancelOrderDTO';
import { CancelTransactionResponse } from '../../Response/CancelTransactionResponse';

export class MapperCancel {
    private constructor() {}

    static toCancelTransaction(Json: any, transaction: TransactionOrder): CancelOrderDTO {
        let object = plainToInstance(CancelTransactionResponse, Json);

        const cancelOrderDTO = new CancelOrderDTO();
        cancelOrderDTO.numberRequest = transaction.numberRequest;
        cancelOrderDTO.amount = transaction.amount;
        cancelOrderDTO.tid = object.tid;
        cancelOrderDTO.nsu = object.nsu;
        cancelOrderDTO.date = object.refundDateTime;
        cancelOrderDTO.authorizationCode = object.refundId;

        return cancelOrderDTO;
    }
}
