import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegister } from "../Core/Interfaces/IRegister";
import { Transition } from "../Entity/Transition";

export class SendTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}

    public execute (transition : Transition){

        try {

            if (this.gateway.consultarTranscionar(transition.numberRequest))
                throw new Error('Transação já enviada');

            this.gateway.enviarTranscionar(transition);
            this.registraSucesso.save("Sucesso ao enviar a Transicao");         

        } catch (error) {
            
            this.registraErro.save(error.message);
        }

    }
}