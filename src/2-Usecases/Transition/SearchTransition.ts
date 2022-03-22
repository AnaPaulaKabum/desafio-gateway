import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister.js";
import { TransitionCreatedResponse } from "../../3-Domain/Entity/TransitionCreatedResponse.js";

export class SearchTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}

    public execute(numberRequest:string): TransitionCreatedResponse{

        try {
             const resultado = this.gateway.consultarTranscionar(numberRequest)
             this.registraSucesso.save(numberRequest); 
             return resultado 

        } catch (error) {
            
            this.registraErro.save(error.message);
            throw(error);
        }
    }
}