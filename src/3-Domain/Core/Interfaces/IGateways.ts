import { Transition } from "../../Entity/Transition.js";
import { TransitionCreatedResponse } from "../../Entity/TransitionCreatedResponse.js";

export interface IGateways {

    sendTransition(transition: Transition): TransitionCreatedResponse;
    consultarTranscionar(numberRequest:string):any;
    capturarTransicao(numberRequest:string):any;
    cancelaExtornoTransicao(numberRequest:string):any;
}