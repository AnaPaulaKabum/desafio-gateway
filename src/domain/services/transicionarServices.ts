import {  IGateways } from "../Core/Interfaces/IGateways";
import { IRegistra } from "../Core/Interfaces/IRegistra";


export class TranscionarServices{

    constructor(private readonly gateway : IGateways,
                private readonly registra: IRegistra){}


    public enviarTransicao(conteudo: any){

        try {
                this.enviarTransicao(conteudo);
                //this.persistencia.salvaAcao(conteudo);                
                
            } catch (error) {
                
                this.registra.execute(error.message);
        }









    }

    public consultarTransicao(){

    }
}