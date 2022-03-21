import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegisterSuccessError } from "../Core/Interfaces/RegisterSucessError";
import { ITransition } from "../Core/Interfaces/Transition/ITransition";
import { ITransitionRepository } from "../Core/Interfaces/Transition/ITransitionRepository";
import { Transition } from "../Entity/Transition";

export class SendTransition{

    constructor(private readonly gateway : IGateways,
                private readonly repository: ITransitionRepository,
                private readonly register: IRegisterSuccessError){}

    public execute (transition : Transition): Transition{

        try {

            if (transition.isValidToSend(this.repository)){
                const transitionResult =this.gateway.sendTransition(transition);
                this.register.registerSuccess("Sucesso ao enviar a Transicao");  
                return transitionResult;       
            }

            return new Transition();

        } catch (error) {           
            this.register.registerError(error.message);
            return new Transition();
        }

    }
}