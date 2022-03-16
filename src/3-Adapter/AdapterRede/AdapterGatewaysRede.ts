import { IGateways } from "../../2-Domain/Core/Interfaces/IGateways";
import { ITransacao } from "../../2-Domain/Core/Interfaces/ITransacao";
import { AdapterObjeto } from "./AdapterObjeto";

export class AdapterGatewaysRede implements IGateways{

    enviarTranscionar(transacao: ITransacao) {

        const resultado = AdapterObjeto.criaTransicao(transacao);
        //Chamada do metodo Enviar e este deverá retornar objeto CriarTransicionarResponse.


    }
    consultarTranscionar(numPedido: string) {
        throw new Error("Method not implemented.");
    }
    capturarTransicao(numPedido: string) {
       //enviar objeto:
       // {
       //  "amount": 2099   
       // }
    }
    cancelaExtornoTransicao(numPedido:string) {
        throw new Error("Method not implemented.");
    }
}