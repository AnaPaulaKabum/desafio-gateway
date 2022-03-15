import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegistra } from "../Core/Interfaces/IRegistra";
import { ValidaEstorno } from "../Validacoes/ValidaEstorno";


export class TranscionarServices{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegistra,
                private readonly registraErro: IRegistra){}


    public enviarTransicao(conteudo: any){

        try {
                // se encontrar, não devera enviar novamente.
                if (! this.gateway.consultarTranscionar(conteudo.numPedido)){
                    this.gateway.enviarTranscionar(conteudo);
                    this.registraSucesso.execute(conteudo); 
                    
                    return ;
                }

                //tratar quando já possuir uma mensagem.
                
            } catch (error) {
                
                this.registraErro.execute(error.message);
        }
    }

    public consultarTransicao(numPedido): any{

        try {

             const resultado = this.gateway.consultarTranscionar(numPedido);
             this.registraSucesso.execute(numPedido); 
             return resultado;

        } catch (error) {
            
            this.registraErro.execute(error.message);
        }
    }

    public capturarTransicao(numPedido){

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

    public cancelaExtornoTransicao(numPedido){

       
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