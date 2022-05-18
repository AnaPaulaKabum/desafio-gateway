import { plainToInstance } from 'class-transformer';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SendCreditCieloTransitionResponse } from '../../Response/SendCreditCieloTransitionResponse';
import { SendDebitTransitionResponse } from '../../Response/SendDebitTransitionResponse';
import { TransactionOrderDTO } from '../../../../../Shared/DTO/Order/TransactionOrderDTO';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';

export class MapperSend {
    private constructor() {}

    public static toTransaction(JsonAPI: any, typeTransaction: TypeTransaction): TransactionOrderDTO {
        if (typeTransaction === TypeTransaction.CREDIT) {
            return MapperSend.transactionCredit(JsonAPI);
        }

        return MapperSend.transactionDebit(JsonAPI);
    }

    private static transactionCredit(Json: any): TransactionOrderDTO {
        let object = plainToInstance(SendCreditCieloTransitionResponse, Json);

        const transactionOrderDTO = new TransactionOrderDTO();

        transactionOrderDTO.numberRequest = object.Payment.PaymentId;
        transactionOrderDTO.tid = object.Payment.Tid;
        transactionOrderDTO.authorizationCode = object.Payment.AuthorizationCode;
        transactionOrderDTO.nsu = object.Payment.ProofOfSale;
        transactionOrderDTO.amount = object.Payment.Amount;
        transactionOrderDTO.installments = object.Payment.Installments;
        transactionOrderDTO.message = object.Payment.ReturnMessage;
        transactionOrderDTO.kind = TypeTransaction.CREDIT;
        transactionOrderDTO.status = StatusTransaction.NO_CAPTURE;

        return transactionOrderDTO;
    }

    private static transactionDebit(Json: any): TransactionOrderDTO {
        let object = plainToInstance(SendDebitTransitionResponse, Json);

        const transactionOrderDTO = new TransactionOrderDTO();

        transactionOrderDTO.numberRequest = object.Payment.PaymentId;
        transactionOrderDTO.tid = object.Payment.Tid;
        transactionOrderDTO.message = object.Payment.ReturnMessage;
        transactionOrderDTO.amount = object.Payment.Amount;
        transactionOrderDTO.kind = TypeTransaction.DEBIT;
        transactionOrderDTO.status = StatusTransaction.NO_CAPTURE;

        return transactionOrderDTO;
    }
}
