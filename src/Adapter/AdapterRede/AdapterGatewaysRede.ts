import { IGateways } from "../../domain/Core/Interfaces/IGateways";
import { ITransacao } from "../../domain/Core/Interfaces/ITransacao";
import { AdapterObjeto } from "./AdapterObjeto";

export class AdapterGatewaysRede implements IGateways{

    enviarTranscionar(transacao: ITransacao) {

        const resultado = AdapterObjeto.criaTransicao(transacao);
        //Chamada do metodo Enviar e este deverá retornar objeto CriarTransicionarResponse.


    }
    consultarTranscionar(numPedido: any) {
        throw new Error("Method not implemented.");
    }
    capturarTransicao(numPedido: any) {
        throw new Error("Method not implemented.");
    }
    cancelaExtornoTransicao() {
        throw new Error("Method not implemented.");
    }
}