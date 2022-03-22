import { CancelReversalTransition } from "../../2-Domain/Usecases/CancelReversalTransition.js";
import { CaptureTransition } from "../../2-Domain/Usecases/CaptureTransition.js";
import { SearchTransition } from "../../2-Domain/Usecases/SearchTransition.js";
import { SendTransition } from "../../2-Domain/Usecases/SendTransition.js";
import { ConverterRequestToTransition } from "../Converter/ConverterRequestToTransition.js";
import { CreateTransitionRequest } from "../Request/createTransitionRequest.js";


export class PaymentGatewaysController{

    constructor ( private readonly sendTransition: SendTransition,
                  private readonly searchTransition: SearchTransition,
                  private readonly captureTransition: CaptureTransition,
                  private readonly cancelReversalTransition: CancelReversalTransition) {}

    public sendTransitions (createTransicaoRequest: CreateTransitionRequest){

       console.log('.Controller');
       const transitionRequest = ConverterRequestToTransition.converte(createTransicaoRequest);
       return this.sendTransition.execute(transitionRequest);
    }

    public searchTransitions(paramNumberRequest :string):any{

        return this.searchTransition.execute(paramNumberRequest);
    }

    public captureTransitions(paramNumberRequest:string){

        this.captureTransition.execute(paramNumberRequest); 
    }

    public cancelReversalTransitions (paramNumberRequest:string){

        this.cancelReversalTransition.execute(paramNumberRequest)   
    }
}