import {  IGateways } from "../..//3-Domain/Core/Interfaces/IGateways.js";
import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister.js";
import { TransitionResponse } from "../../3-Domain/Entity/TransitionSearchResponse.js";

export class CaptureTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}
                
    public execute(numberRequest:string,amount:number): TransitionResponse {

        try {
                console.log('..SendTransition(UseCases)');
                const captureTranstion = this.gateway.captureTransition(numberRequest,amount);
                this.registraSucesso.save(numberRequest); 
                return captureTranstion;
            
        } catch (error) {
            
            this.registraErro.save(error.message);
            return new TransitionResponse();
        }
    }
}