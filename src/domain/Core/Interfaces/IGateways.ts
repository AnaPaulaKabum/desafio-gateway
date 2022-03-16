import { Transacao } from "../../../Adapter/AdapterRede/Transacao";

export interface IGateways {

    enviarTranscionar(conteudo:Transacao);
    consultarTranscionar(numPedido:any);
    capturarTransicao(numPedido:any);
    cancelaExtornoTransicao(numPedido:any);

}