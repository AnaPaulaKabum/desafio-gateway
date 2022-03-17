import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegister } from "../Core/Interfaces/IRegister";
import { ValidaEstorno } from "../Validacoes/ValidaEstorno";


export class CancelReversalTransition{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}


    public execute(numberRequest:string){

        try {

            const resultado = this.gateway.consultarTranscionar(numberRequest);

            if (! resultado ){

                if (! ValidaEstorno.valida(resultado) ){
                   
                    this.gateway.cancelaExtornoTransicao(numberRequest);
                    this.registraSucesso.save(numberRequest); 
                }
            }
            
        } catch (error) {
            this.registraErro.save(error.message);
        }
    }
}