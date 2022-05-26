import { plainToInstance } from 'class-transformer';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SendTransitionResponse } from '../../Response/SendTransitionResponse';
import { TransactionOrderDTOType } from '../../../../../Shared/DTO/Order/TransactionOrderDTOType';

export class MapperSend {
    static toTransaction(Json: any, typeTransaction: TypeTransaction): TransactionOrderDTOType {
        let object = plainToInstance(SendTransitionResponse, Json);

        return {
            tid: object.brandTid,
            numberRequest: object.reference,
            authorizationCode: object.authorizationCode,
            nsu: object.nsu,
            message: object.returnMessage,
            amount: object.amount,
            installments: object.installments,
            kind: typeTransaction,
            status: StatusTransaction.NO_CAPTURE,
        };
    }
}
