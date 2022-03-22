import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister.js";
import { TransitionResponse } from "../../3-Domain/Entity/TransitionSearchResponse.js";
import { MessageSucess } from "../../3-Domain/Util/MessageSuccess.js";

export class SearchTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}

    public execute(numberRequest:string): TransitionResponse{

        try {
             const resultado = this.gateway.searchTransition(numberRequest)
             this.registraSucesso.save(MessageSucess.generateMessage('Consultado Transição')); 
             return resultado 

        } catch (error) {
            
            this.registraErro.save(error.message);
            throw(error);
        }
    }
}