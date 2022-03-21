import {  IGateways } from "../Core/Interfaces/IGateways.js";
import { IRegister } from "../Core/Interfaces/IRegister.js";
import { TransitionCreateResponse } from "../Entity/TransitionCreateResponse.js";

export class SearchTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}

    public execute(numberRequest:string): TransitionCreateResponse{

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