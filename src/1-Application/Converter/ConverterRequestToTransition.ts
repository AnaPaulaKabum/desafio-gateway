import { Transition } from "../../3-Domain/Entity/Transition.js";
import { CreateTransitionRequest } from "../Request/createTransitionRequest.js";

export abstract class ConverterRequestToTransition{

    static converte(request:CreateTransitionRequest): Transition{

        const transition =  new Transition();

        transition.numberRequest   = request.numberRequest;
        transition.kind            = request.kind;
        transition.amount          = request.amount;
        transition.installments    = request.installments;
        transition.cardholderName  = request.cardholderName;
        transition.cardNumber      = request.cardNumber;
        transition.expirationMonth = request.expirationMonth;
        transition.expirationYear  = request.expirationYear;
        transition.securityCode    = request.securityCode;
        transition.softDescriptor  = request.softDescriptor;

        return transition;
    }
}