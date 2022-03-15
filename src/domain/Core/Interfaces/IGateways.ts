export interface IGateways {

    enviarTranscionar(conteudo:any);
    consultarTranscionar(numPedido:any);
    capturarTransicao(numPedido:any);
    cancelaExtornoTransicao(numPedido:any);

}