
import { CreateTransitionRede } from "./CreateTransitionRede.js";
import { TransitionCreatedResponse } from "../../../3-Domain/Entity/TransitionCreatedResponse.js";
import { Transition } from "../../../3-Domain/Entity/Transition.js";
import { IGateways } from "../../../3-Domain/Core/Interfaces/IGateways.js";
import { MockSendTransition } from "./Mock/SendTransition.js";
import { ReturnAPIToTransitionCreatedResponse } from "./Converter/Transition/ReturnAPIToTransitionCreatedResponse.js";
import { MockSearchTransition } from "./Mock/SearchTransition.js";
import { ReturnAPIToSearchTransition } from "./Converter/Transition/ReturnAPIToSearchTransition.js";
import { TransitionResponse } from "../../../3-Domain/Entity/TransitionSearchResponse.js";
import { MockCaptureTransition } from "./Mock/CaptureTransition.js";
import { ReturnAPIToCaptureTransition } from "./Converter/Transition/ReturnAPIToCaptureTransition.js";

export class GatewaysRedeAdapter implements IGateways{

    sendTransition(transition: Transition): TransitionCreatedResponse {

       console.log('..sendTransition(Adapter)');
       const transitionRedeRequest = CreateTransitionRede.generate(transition);
       const returnAPI = MockSendTransition.send(transitionRedeRequest);

       return ReturnAPIToTransitionCreatedResponse.converte(returnAPI);
    }

    searchTransition(numberRequest: string):TransitionResponse {

        console.log('..searchTransition(Adapter)')
        const returnAPI = MockSearchTransition.search(numberRequest);
        
        return ReturnAPIToSearchTransition.converte(returnAPI);
    }
    
    captureTransition(numberRequest: string,amount:number): TransitionResponse {

        console.log('..searchTransition(Adapter)')
        const returnAPI = MockCaptureTransition.capture(numberRequest,amount);

        return ReturnAPIToCaptureTransition.converte(returnAPI);
    }
    cancelReversalTransition(numberRequest: string) {
        throw new Error("Method not implemented.");
    }
}