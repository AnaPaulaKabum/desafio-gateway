import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IRegisterSuccessError } from "../../3-Domain/Core/Interfaces/IRegisterSucessError.js";
import { ITransitionRepository } from "../../3-Domain/Core/Interfaces/Transition/ITransitionRepository.js";
import { Transition } from "../../3-Domain/Entity/Transition.js";
import { TransitionCreatedResponse } from "../../3-Domain/Entity/TransitionCreatedResponse.js";
import { MessageSucess } from "../../3-Domain/Util/MessageSuccess.js";

export class SendTransition{

    constructor(private readonly gateway : IGateways,
                private readonly repository: ITransitionRepository,
                private readonly register: IRegisterSuccessError){}

    public execute (transition : Transition): TransitionCreatedResponse{

        try {
            console.log('..SendTransition(UseCases)');

            if (transition.isValidToSend(this.repository)){
                const transitionResult = this.gateway.sendTransition(transition);
                this.register.registerSuccess(MessageSucess.generateMessage('Enviado Transição'));  
                return transitionResult;       
            }

            return new TransitionCreatedResponse();

        } catch (error) {    
            console.log(error);       
            this.register.registerError(error.message);
            return new TransitionCreatedResponse();
        }
    }
}