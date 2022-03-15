import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegistra } from "../Core/Interfaces/IRegistra";


export class TranscionarServices{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegistra,
                private readonly registraErro: IRegistra){}


    public enviarTransicao(conteudo: any){

        try {
                // se encontrar, não devera enviar novamente.
                if ( this.gateway.consultartranscionar(conteudo.numPedido)){
                    this.gateway.enviartranscionar(conteudo);
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
            return this.gateway.consultartranscionar(numPedido)
            
        } catch (error) {
            
            this.registraErro.execute(error.message);
        }
    }
}