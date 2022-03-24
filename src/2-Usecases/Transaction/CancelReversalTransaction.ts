import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IMail } from "../../3-Domain/Core/Interfaces/IMail.js";
import { ILogRepository } from "../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js";
import { ITransactionRepository } from "../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js";



export class CancelReversalTransaction{

    constructor(private readonly gateway : IGateways,
                private readonly repositoryTransaction: ITransactionRepository,
                private readonly repositoryLog: ILogRepository,
                private readonly mail: IMail){}

    public execute(numberRequest:string){

        try {

            /*const resultado = this.gateway.consultarTranscionar(numberRequest);

            if (! resultado ){

                if (! ValidaEstorno.valida(resultado) ){
                   
                    this.gateway.cancelaExtornoTransicao(numberRequest);
                    this.registraSucesso.save(numberRequest); 
                }
            }*/
            
        } catch (error) {
            //this.registraErro.save(error.message);
        }
    }
}