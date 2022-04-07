import { ParamValidateType } from '../../5-Shared/Interfaces/Gateway/ParamValidateType';
import { TransactionRequest } from '../Request/TransactionRequest';

export abstract class ValidateParam {
    static isValidSend(param: ParamValidateType, request: TransactionRequest) {
        if (request.expirationMonth < 1 || request.expirationMonth > 12) {
            throw new Error('Mes deverá ser representando por 1 a 12');
        }
        if (request.numberRequest.length > param.numberRequest_MAX) {
            throw new Error('NumberRequest deverá possuir até ' + param.numberRequest_MAX + ' caracter');
        }

        if (request.installments < 0 || request.installments > param.installments_MAX) {
            throw new Error(
                'Installments deverá possuir um número de ' + param.installments_MIN + ' até ' + param.installments_MAX,
            );
        }

        if (request.cardHolderName.length > param.cardholderName_MAX) {
            throw new Error('CardHolderName deverá ter menos ' + param.cardholderName_MAX + ' caracter');
        }
        /*
        if (transactionRequest.amount) {
            throw new Error();
        }


        if (transactionRequest.cardNumber) {
            throw new Error();
        }

        if (transactionRequest.expirationYear) {
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
