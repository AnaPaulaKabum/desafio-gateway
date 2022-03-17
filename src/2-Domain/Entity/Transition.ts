import { ITransition } from "../Core/Interfaces/ITransition";

export class Transition implements ITransition{

    numberRequest: string;
    kind: TipoTransacao;
    amount: number;
    installments: number;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
    softDescriptor: string;
}