import { Transition } from "../../Entity/Transition";
import { TransitionCreateResponse } from "../../Entity/TransitionCreateResponse";

export interface IGateways {

    sendTransition(transition: Transition):any;
    //TransacaoResponseDTO pois irá trazer mais informações do que o TransacaoDTO
    consultarTranscionar(numPedido:string):TransitionCreateResponse;
    capturarTransicao(numPedido:string):any;
    cancelaExtornoTransicao(numPedido:string):any;
}