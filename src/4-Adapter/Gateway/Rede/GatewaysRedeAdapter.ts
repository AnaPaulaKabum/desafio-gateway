
import { AdapterObjeto } from "./AdapterObjeto.js";
import { TransitionCreatedResponse } from "../../../3-Domain/Entity/TransitionCreatedResponse.js";
import { Transition } from "../../../3-Domain/Entity/Transition.js";
import { IGateways } from "../../../3-Domain/Core/Interfaces/IGateways.js";
import { MockSendTransition } from "./Mock/SendTransition.js";
import { ReturnAPIToTransitionCreatedResponse } from "./Converter/ReturnAPIToTransitionCreatedResponse.js";
import { MockSearchTransition } from "./Mock/SearchTransition.js";
import { ReturnAPIToSearchTransition } from "./Converter/ReturnAPIToSearchTransition.js";
import { TransitionSearchResponse } from "../../../3-Domain/Entity/TransitionSearchResponse.js";

export class GatewaysRedeAdapter implements IGateways{

    sendTransition(transition: Transition): TransitionCreatedResponse {

       console.log('..sendTransition(Adapter)');
       const transitionRedeRequest = AdapterObjeto.createTransitionRede(transition);
       const returnAPI = MockSendTransition.send(transitionRedeRequest);

       return ReturnAPIToTransitionCreatedResponse.converte(returnAPI);
    }

    searchTransition(numberRequest: string):TransitionSearchResponse {

        console.log('..searchTransition(Adapter)')
        const returnAPI = MockSearchTransition.search(numberRequest);
        return ReturnAPIToSearchTransition.converte(returnAPI);
    }
    
    captureTransition(numberRequest: string) {
       //enviar objeto:
       // {
       //  "amount": 2099   
       // }
    }
    cancelReversalTransition(numberRequest: string) {
        throw new Error("Method not implemented.");
    }
}