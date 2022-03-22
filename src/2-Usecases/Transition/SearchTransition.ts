import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister.js";
import { TransitionResponse } from "../../3-Domain/Entity/TransitionSearchResponse.js";

export class SearchTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}

    public execute(numberRequest:string): TransitionResponse{

        try {
             const resultado = this.gateway.searchTransition(numberRequest)
             this.registraSucesso.save(numberRequest); 
             return resultado 

        } catch (error) {
            
            this.registraErro.save(error.message);
            throw(error);
        }
    }
}