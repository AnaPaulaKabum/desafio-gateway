import { Transition } from "../../Entity/Transition.js";
import { TransitionCreatedResponse } from "../../Entity/TransitionCreatedResponse.js";
import { TransitionResponse } from "../../Entity/TransitionSearchResponse.js";

export interface IGateways {

    sendTransition(transition: Transition): TransitionCreatedResponse;
    searchTransition(numberRequest:string): TransitionResponse;
    captureTransition(numberRequest:string,amount:number):TransitionResponse;
    cancelReversalTransition(numberRequest:string):any;
}