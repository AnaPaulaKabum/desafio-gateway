import { TransitionCreatedResponse } from "../../3-Domain/Entity/TransitionCreatedResponse.js";
import { CancelReversalTransition } from "../../2-Usecases/Transition/CancelReversalTransition.js";
import { CaptureTransition } from "../../2-Usecases/Transition/CaptureTransition.js";
import { SearchTransition } from "../../2-Usecases/Transition/SearchTransition.js";
import { SendTransition } from "../../2-Usecases/Transition/SendTransition.js";
import { ConverterRequestToTransition } from "../Converter/ConverterRequestToTransition.js";
import { CreateTransitionRequest } from "../Request/createTransitionRequest.js";
import { TransitionSearchResponse } from "../../3-Domain/Entity/TransitionSearchResponse.js";

export class PaymentGatewaysController{

    constructor ( private readonly sendTransition: SendTransition,
                  private readonly searchTransition: SearchTransition,
                  private readonly captureTransition: CaptureTransition,
                  private readonly cancelReversalTransition: CancelReversalTransition) {}

    public sendTransitions (createTransicaoRequest: CreateTransitionRequest) : TransitionCreatedResponse{

       console.log('.Controller');
       const transitionRequest = ConverterRequestToTransition.converte(createTransicaoRequest);
       return this.sendTransition.execute(transitionRequest);
    }

    public searchTransitions(paramNumberRequest :string): TransitionSearchResponse{

        console.log('.Controller');
        return this.searchTransition.execute(paramNumberRequest);
    }

    public captureTransitions(paramNumberRequest:string){

        this.captureTransition.execute(paramNumberRequest); 
    }

    public cancelReversalTransitions (paramNumberRequest:string){

        this.cancelReversalTransition.execute(paramNumberRequest)   
    }
}