import { CancelReversalTransition } from "../../2-Domain/Usecases/CancelReversalTransition";
import { CaptureTransition } from "../../2-Domain/Usecases/CaptureTransition";
import { SearchTransition } from "../../2-Domain/Usecases/SearchTransition";
import { SendTransition } from "../../2-Domain/Usecases/SendTransition";
import { ConverterRequestToTransition } from "../Converter/ConverterRequestToTransition";
import { CreateTransitionRequest } from "../Request/createTransitionRequest";


export class PaymentGatewaysController{

    constructor ( private readonly sendTransition: SendTransition,
                  private readonly searchTransition: SearchTransition,
                  private readonly captureTransition: CaptureTransition,
                  private readonly cancelReversalTransition: CancelReversalTransition) {}

    public sendTransitions (createTransicaoRequest: CreateTransitionRequest){

       const resultado = ConverterRequestToTransition.converte(createTransicaoRequest);
       this.sendTransition.execute(resultado);
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