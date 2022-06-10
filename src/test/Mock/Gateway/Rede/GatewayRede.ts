import { MapperCancel } from '../../../../Infra/Gateway/Rede/Mapper/Transaction/MapperCancel';
import { MapperCapture } from '../../../../Infra/Gateway/Rede/Mapper/Transaction/MapperCapture';
import { MapperSearch } from '../../../../Infra/Gateway/Rede/Mapper/Transaction/MapperSearch';
import { MapperSend } from '../../../../Infra/Gateway/Rede/Mapper/Transaction/MapperSend';
import { CancelTransactionDTOType } from '../../../../Domain/Shared/DTO/CancelTransactionDTOType';
import { CaptureTransactionDTOType } from '../../../../Domain/Shared/DTO/CaptureTransactionDTOType';
import { CancelOrderDTOType } from '../../../../Domain/Shared/DTO/Order/CancelOrderDTOType';
import { CaptureOrderDTOType } from '../../../../Domain/Shared/DTO/Order/CaptureOrderDTOType';
import { SearchTransactionOrderDTOType } from '../../../../Domain/Shared/DTO/Order/SearchTransactionOrderType';
import { TransactionOrderDTOType } from '../../../../Domain/Shared/DTO/Order/TransactionOrderDTOType';
import { SearchTransactionDTOType } from '../../../../Domain/Shared/DTO/SearchTransactionDTOType';
import { TransactionDTOType } from '../../../../Domain/Shared/DTO/TransactionDTOType';
import { IGateways } from '../../../../Domain/Shared/Interfaces/Gateway/IGateways';
import { MockAPICancelRede } from './ReturnAPI/MockAPICancelRede';
import { MockAPICaptureRede } from './ReturnAPI/MockAPICaptureRede';
import { MockAPISearchRede } from './ReturnAPI/MockAPISearchRede';
import { MockAPISendRede } from './ReturnAPI/MockAPISendRede';
import { Transaction } from '../../../../Domain/Entity/Transaction/Transaction';

export class GatewayRedeMock implements IGateways {
    async sendTransaction(transaction: Transaction): Promise<TransactionOrderDTOType> {
        const data = {
            kind: transaction.kind,
            reference: transaction.numberRequest.value,
            amount: transaction.amount.value,
            installments: transaction.installments.value,
            cardholderName: transaction.card.name,
            cardNumber: transaction.card.number,
            expirationMonth: transaction.card.expirationMonth,
            expirationYear: transaction.card.expirationYear,
            securityCode: transaction.card.securityCode,
            softDescriptor: transaction.softDescriptor.value,
        };

        const returnAPI = await MockAPISendRede.send(data);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }
    async searchTransaction(searchRequest: SearchTransactionDTOType): Promise<SearchTransactionOrderDTOType> {
        const returnAPI = await MockAPISearchRede.searchNumberRequest(searchRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }
    async captureTransaction(captureTransactionDTO: CaptureTransactionDTOType): Promise<CaptureOrderDTOType> {
        const data = { amount: captureTransactionDTO.amount };
        const returnAPI = await MockAPICaptureRede.capture(data);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO.amount));
        });
    }
    async cancelTransaction(cancelTransactionDTO: CancelTransactionDTOType): Promise<CancelOrderDTOType> {
        const data = { amount: cancelTransactionDTO.amount };

        const returnAPI = await MockAPICancelRede.cancel(data);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI));
        });
    }
}
