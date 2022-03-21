import { Transition } from "../../Entity/Transition.js";
import { TransitionCreateResponse } from "../../Entity/TransitionCreateResponse.js";

export interface IGateways {

    sendTransition(transition: Transition):any;
    //TransacaoResponseDTO pois irá trazer mais informações do que o TransacaoDTO
    consultarTranscionar(numPedido:string):TransitionCreateResponse;
    capturarTransicao(numPedido:string):any;
    cancelaExtornoTransicao(numPedido:string):any;
}