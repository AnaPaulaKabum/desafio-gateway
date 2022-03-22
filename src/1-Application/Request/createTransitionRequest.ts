import { ITransition } from "../../3-Domain/Core/Interfaces/Transition/ITransition.js";

export class CreateTransitionRequest implements ITransition{

    numberRequest: string;
    kind: TypeTransition;
    amount: number;
    installments: number;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
    softDescriptor: string;
}