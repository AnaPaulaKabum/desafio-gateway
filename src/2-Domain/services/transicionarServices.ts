import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegistra } from "../Core/Interfaces/IRegistra";
import { TransacaoDTO } from "../DTO/TransacaoDTO";
import { TransacaoResponseDTO } from "../DTO/TransacaoResponseDTO";
import { ValidaEstorno } from "../Validacoes/ValidaEstorno";


export class TranscionarServices{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegistra,
                private readonly registraErro: IRegistra){}


    public enviarTransicao(transacao : TransacaoDTO){

        try {
                // se encontrar, não devera enviar novamente.
                if (! this.gateway.consultarTranscionar(transacao.numPedido)){
                    this.gateway.enviarTranscionar(transacao);
                    this.registraSucesso.execute("Sucesso ao enviar a Transicao"); 
                    
                    return ;
                }

                //tratar quando já possuir uma transicao.

            } catch (error) {
                
                this.registraErro.execute(error.message);
        }
    }

    public consultarTransicao(numPedido:string): TransacaoResponseDTO{

        try {

             const resultado = this.gateway.consultarTranscionar(numPedido)
             this.registraSucesso.execute(numPedido); 
             return resultado 

        } catch (error) {
            
            this.registraErro.execute(error.message);
            throw(error);
        }
    }

    public capturarTransicao(numPedido:string){

        try {

            if (! this.gateway.consultarTranscionar(numPedido)){
                    //controlar para enviar apenas uma vez, por status do objeto?
                    this.gateway.capturarTransicao(numPedido);
                    this.registraSucesso.execute(numPedido); 
            }     
        } catch (error) {
            
            this.registraErro.execute(error.message);
        }
    }

    public cancelaExtornoTransicao(numPedido:string){

        try {

            const resultado = this.gateway.consultarTranscionar(numPedido);

            if (! resultado ){

                if (! ValidaEstorno.valida(resultado) ){
                   
                    this.gateway.cancelaExtornoTransicao(numPedido);
                    this.registraSucesso.execute(numPedido); 
                }
            }
            
        } catch (error) {
            this.registraErro.execute(error.message);
        }
    }
}