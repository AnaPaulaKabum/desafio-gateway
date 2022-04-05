export interface IValidateParamGateways {
    isValidSend(): boolean;
    isValidCapture(): boolean;
    isValidSearch(): boolean;
    isValidCancel(): boolean;
}
