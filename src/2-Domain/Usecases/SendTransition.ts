import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegister } from "../Core/Interfaces/IRegister";
import { TransacaoDTO } from "../Entity/Transition";

export class SendTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}

    public execute (transition : TransacaoDTO){

        try {
            // se encontrar, não devera enviar novamente.
            if (! this.gateway.consultarTranscionar(transition.numPedido)){
                this.gateway.enviarTranscionar(transition);
                this.registraSucesso.save("Sucesso ao enviar a Transicao"); 
                
                return ;
            }

            //tratar quando já possuir uma transicao.

        } catch (error) {
            
            this.registraErro.save(error.message);
        }

    }
}