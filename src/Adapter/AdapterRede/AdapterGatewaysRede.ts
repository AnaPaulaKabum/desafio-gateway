import { IGateways } from "../../domain/Core/Interfaces/IGateways";

export class AdapterGatewaysRede implements IGateways{


    enviarTranscionar(conteudo: any) {
        throw new Error("Method not implemented.");
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