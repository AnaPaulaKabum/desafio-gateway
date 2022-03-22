import { Transition } from "../../Entity/Transition.js";
import { TransitionCreatedResponse } from "../../Entity/TransitionCreatedResponse.js";
import { TransitionSearchResponse } from "../../Entity/TransitionSearchResponse.js";

export interface IGateways {

    sendTransition(transition: Transition): TransitionCreatedResponse;
    searchTransition(numberRequest:string): TransitionSearchResponse;
    captureTransition(numberRequest:string):any;
    cancelReversalTransition(numberRequest:string):any;
}