import { IValidateParamGateways } from '../../../5-Shared/Interfaces/Gateway/IValidateParamGateways';

export class ValidateParamRede implements IValidateParamGateways {
    isValidSend(): boolean {
        throw new Error('Method not implemented.');
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
