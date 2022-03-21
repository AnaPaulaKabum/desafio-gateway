import { ITransition } from "../../2-Domain/Core/Interfaces/ITransition";

export class CreateTransitionRequest implements ITransition{

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