import { TransactionRequest } from '../../../1-Application/Request/TransactionRequest.js';
import { IValidateParamGateways } from '../../../5-Shared/Interfaces/Gateway/IValidateParamGateways.js';

export class ValidateParamRede implements IValidateParamGateways {
    isValidSend(transactionRequest: TransactionRequest): boolean {
        /* if (transactionRequest.numberRequest.length >= 16) {
            throw new Error();
        }

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

        return true;
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
