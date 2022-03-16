import { ITransacao } from "./ITransacao";

export interface IGateways {

    enviarTranscionar(conteudo:ITransacao);
    consultarTranscionar(numPedido:string);
    capturarTransicao(numPedido:string);
    cancelaExtornoTransicao(numPedido:string);
}