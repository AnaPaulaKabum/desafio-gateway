import { ITransition } from "../Core/Interfaces/Transition/ITransition.js";
import { ITransitionRepository } from "../Core/Interfaces/Transition/ITransitionRepository.js";

export class Transition implements ITransition{

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


    isValidToSend(repository: ITransitionRepository){

        const status = repository.searchStatus(this.numberRequest);

        return status === StatusTransition.READY
    }
}