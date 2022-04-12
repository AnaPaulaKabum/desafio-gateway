import { ParamValidateType } from '../../../Shared/Interfaces/Gateway/ParamValidateType';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';

export abstract class ValidateParam {
    static isValidSend(param: ParamValidateType, request: TransactionDTO) {
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

        if (request.softDescriptor.length > param.softDescriptor_MAX) {
            throw new Error('SoftDescriptor deverá ter menos ' + param.softDescriptor_MAX + ' caracter');
        }

        if (request.amount.toString().replace('.', '').length > param.amount_MAX) {
            throw new Error('amount deverá ter menos ' + param.amount_MAX + ' caracteres');
        }
    }
    /*isValidCapture(): boolean {
        throw new Error('Method not implemented.');
    }
    isValidSearch(): boolean {
        throw new Error('Method not implemented.');
    }
    isValidCancel(): boolean {
        throw new Error('Method not implemented.');
    }*/
}
