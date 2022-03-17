import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegister } from "../Core/Interfaces/IRegister";

export class CaptureTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}
                
    public execute(numberRequest:string){

        try {

            if (! this.gateway.consultarTranscionar(numberRequest)){
                    //controlar para enviar apenas uma vez, por status do objeto?
                    this.gateway.capturarTransicao(numberRequest);
                    this.registraSucesso.save(numberRequest); 
            }     
        } catch (error) {
            
            this.registraErro.save(error.message);
        }
    }
}