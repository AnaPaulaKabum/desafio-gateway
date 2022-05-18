import { plainToInstance } from 'class-transformer';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SendTransitionResponse } from '../../Response/SendTransitionResponse';
import { TransactionOrderDTO } from '../../../../../Shared/DTO/Order/TransactionOrderDTO';

export class MapperSend {
    static toTransaction(Json: any, typeTransaction: TypeTransaction): TransactionOrderDTO {
        let object = plainToInstance(SendTransitionResponse, Json);

        const transactionOrderDTO = new TransactionOrderDTO();

        transactionOrderDTO.tid = object.brandTid;
        transactionOrderDTO.numberRequest = object.reference;
        transactionOrderDTO.authorizationCode = object.authorizationCode;
        transactionOrderDTO.nsu = object.nsu;
        transactionOrderDTO.message = object.returnMessage;
        transactionOrderDTO.amount = object.amount;
        transactionOrderDTO.installments = object.installments;
        transactionOrderDTO.kind = typeTransaction;
        transactionOrderDTO.status = StatusTransaction.NO_CAPTURE;

        return transactionOrderDTO;
    }
}
