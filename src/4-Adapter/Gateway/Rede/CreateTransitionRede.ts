import { ITransition } from "../../../3-Domain/Core/Interfaces/Transition/ITransition.js";
import { TransitionRede } from "./Request/TransitionRede.js";

export abstract class CreateTransitionRede{

    static generate(transition: ITransition):TransitionRede{

        let transitionRede =  new TransitionRede();

        transitionRede.numberRequest   = transition.numberRequest;
        transitionRede.kind            = transition.kind;
        transitionRede.amount          = transition.amount;
        transitionRede.installments    = transition.installments;
        transitionRede.cardholderName  = transition.cardholderName;
        transitionRede.cardNumber      = transition.cardNumber;
        transitionRede.expirationMonth = transition.expirationMonth;
        transitionRede.expirationYear  = transition.expirationYear;
        transitionRede.securityCode    = transition.securityCode;
        transitionRede.softDescriptor  = transition.softDescriptor;
        
        return transitionRede
    }
}