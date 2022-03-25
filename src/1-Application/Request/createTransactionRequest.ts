export class CreateTransactionRequest {
    numberRequest: string;
    kind: TypeTransaction;
    amount: number;
    installments: number;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    private _securityCode: string;
    softDescriptor: string;

    public set securityCode(securityCode: string) {
        if (securityCode.length! > 3) {
            throw new Error('The securityCode is invalid');
        }

        this._securityCode = securityCode;
    }
}
