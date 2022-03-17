import { Transition } from "../../Entity/Transition";
import { TransitionResponse } from "../../Entity/TransitionResponse";

export interface IGateways {

    enviarTranscionar(conteudo: Transition):any;
    //TransacaoResponseDTO pois irá trazer mais informações do que o TransacaoDTO
    consultarTranscionar(numPedido:string):TransitionResponse;
    capturarTransicao(numPedido:string):any;
    cancelaExtornoTransicao(numPedido:string):any;
}