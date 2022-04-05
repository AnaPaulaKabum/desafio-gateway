import { TransactionRequest } from '../../../1-Application/Request/TransactionRequest.js';

export interface IValidateParamGateways {
    isValidSend(transactionRequest: TransactionRequest): boolean;
    isValidCapture(): boolean;
    isValidSearch(): boolean;
    isValidCancel(): boolean;
}
