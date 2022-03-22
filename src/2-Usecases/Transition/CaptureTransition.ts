import {  IGateways } from "../..//3-Domain/Core/Interfaces/IGateways.js";
import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister.js";

export class CaptureTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}
                
    public execute(numberRequest:string){

        try {
                this.gateway.captureTransition(numberRequest);
                this.registraSucesso.save(numberRequest); 
            
        } catch (error) {
            
            this.registraErro.save(error.message);
        }
    }
}