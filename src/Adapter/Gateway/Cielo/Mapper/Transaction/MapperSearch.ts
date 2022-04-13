import { plainToInstance } from 'class-transformer';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse';
import { SearchTransactionOrder } from '../../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CaptureOrder';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { RefundOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/RefundOrder';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { Card } from '../../../../../Domain/Entity/Transaction/ValueObject/Card';

export abstract class MapperSearch {
    static toTransactionComplete(Json: any): SearchTransactionOrder {
        let object = plainToInstance(SearchCieloTransactionResponse, Json);

        let transactionSearchResponse = new SearchTransactionOrder();

        const numberRequest = object.MerchantOrderId;
        const numberCard = object.Payment.CreditCard.CardNumber;
        const brandCard = object.Payment.CreditCard.Brand;
        const nameCard = object.Payment.CreditCard.Holder;

        transactionSearchResponse.card = Card.create(numberCard, nameCard, 1, 2022, '123');
        let status = StatusTransaction.NO_CAPTURE;

        if (object.Payment.CapturedAmount > 0) {
            const amountCapture = object.Payment.CapturedAmount;
            const dateCapture = object.Payment.CapturedDate;
            const numberRequestCapture = object.MerchantOrderId;
            const nsuCapture = '123';
            transactionSearchResponse.capture = CaptureOrder.create(
                numberRequest,
                amountCapture,
                dateCapture,
                nsuCapture,
            );
            status = StatusTransaction.CAPTURE;
        }

        if (object.Payment.VoidedAmount > 0) {
            const idCancel = 'xx';
            const amountCancel = object.Payment.VoidedAmount;
            const dateCancel = object.Payment.VoidedDate;
            transactionSearchResponse.refund = RefundOrder.create(
                numberRequest,
                dateCancel,
                idCancel,
                amountCancel,
                '123',
                '123',
                '123',
            );
            status = StatusTransaction.CANCEL;
        }
        let kind;
        if (object.Payment.Type === 'CreditCard') {
            kind = TypeTransaction.CREDIT;
        } else {
            kind = TypeTransaction.DEBIT;
        }

        const installments = object.Payment.Installments;
        const message = 'xxx';
        const tid = object.Payment.Tid;
        const authorizationCodePayment = object.Payment.AuthorizationCode;
        const nsu = object.Payment.ProofOfSale;
        const amount = object.Payment.Amount;

        transactionSearchResponse.transaction = TransactionOrder.create(
            numberRequest,
            tid,
            kind,
            authorizationCodePayment,
            nsu,
            status,
            amount,
            installments,
            message,
        );

        return transactionSearchResponse;
    }
}
