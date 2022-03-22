import {  IGateways } from "../Core/Interfaces/IGateways.js";
import { IRegisterSuccessError } from "../Core/Interfaces/RegisterSucessError.js";
import { ITransitionRepository } from "../Core/Interfaces/Transition/ITransitionRepository.js";
import { Transition } from "../Entity/Transition.js";

export class SendTransition{

    constructor(private readonly gateway : IGateways,
                private readonly repository: ITransitionRepository,
                private readonly register: IRegisterSuccessError){}

    public execute (transition : Transition): Transition{

        try {

            console.log('..SendTransition(UseCases)');
           // if (transition.isValidToSend(this.repository)){
                const transitionResult =this.gateway.sendTransition(transition);
                this.register.registerSuccess("Sucesso ao enviar a Transicao");  
                return transitionResult;       
           // }
           // console.log(';;;')

            return new Transition();

        } catch (error) {           
            this.register.registerError(error.message);
            return new Transition();
        }

    }
}