import { Transition } from "../../2-Domain/Entity/Transition";
import { CreateTransitionRequest } from "../Request/createTransitionRequest";

export abstract class ConverterRequestToTransition{

    static converte(request:CreateTransitionRequest): Transition{

        const transition =  new Transition();

        transition.numberRequest   = request.numberRequest ;
        transition.kind            = request.kind;
        transition.amount          = request.amount ;
        transition.installments    = request.installments ;
        transition.cardholderName  = request.cardholderName ;
        transition.cardNumber      = request.cardNumber ;
        transition.expirationMonth = request.expirationMonth ;
        transition.expirationYear  = request.expirationYear ;
        transition.securityCode    = request.securityCode ;
        transition.softDescriptor  = request.softDescriptor ;

        return transition;
    }
}