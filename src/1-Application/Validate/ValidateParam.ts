import { ParamValidateType } from '../../5-Shared/Interfaces/Gateway/ParamValidateType';
import { TransactionRequest } from '../Request/TransactionRequest';

export abstract class ValidateParam {
    static isValidSend(param: ParamValidateType, transactionRequest: TransactionRequest) {
        if (transactionRequest.numberRequest.length > param.numberRequest_MAX) {
            throw new Error('NumberRequest deverá possuir até ' + param.numberRequest_MAX + ' caracter');
        }

        /*
        if (transactionRequest.amount) {
            throw new Error();
        }

        if (transactionRequest.cardHolderName) {
            throw new Error();
        }

        if (transactionRequest.cardNumber) {
            throw new Error();
        }
        if (transactionRequest.expirationMonth) {
            throw new Error();
        }

        if (transactionRequest.expirationYear) {
            throw new Error();
        }

        if (transactionRequest.installments) {
            throw new Error();
        }

        if (transactionRequest.kind) {
            throw new Error();
        }

        if (transactionRequest.securityCode) {
            throw new Error();
        }

        if (transactionRequest.softDescriptor) {
            throw new Error();
        }*/
    }
    isValidCapture(): boolean {
        throw new Error('Method not implemented.');
    }
    isValidSearch(): boolean {
        throw new Error('Method not implemented.');
    }
    isValidCancel(): boolean {
        throw new Error('Method not implemented.');
    }
}
