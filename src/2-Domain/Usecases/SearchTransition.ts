import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegister } from "../Core/Interfaces/IRegister";
import { TransitionResponse } from "../Entity/TransitionResponse";

export class SearchTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}

    public execute(numberRequest:string): TransitionResponse{

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