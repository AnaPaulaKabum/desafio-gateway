import { Transition } from "../../Entity/Transition.js";
import { TransitionCreatedResponse } from "../../Entity/TransitionCreatedResponse.js";

export interface IGateways {

    sendTransition(transition: Transition): TransitionCreatedResponse;
    //TransacaoResponseDTO pois irá trazer mais informações do que o TransacaoDTO
    consultarTranscionar(numPedido:string):any;
    capturarTransicao(numPedido:string):any;
    cancelaExtornoTransicao(numPedido:string):any;
}