import { ITransition } from "../../../3-Domain/Core/Interfaces/Transition/ITransition.js";
import { TransitionRede } from "./TransitionRede.js";

export abstract class AdapterObjeto{

    static createTransitionRede(transition: ITransition):TransitionRede{

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