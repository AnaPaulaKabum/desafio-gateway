import { CancelReversalTransition } from "../../2-Domain/Usecases/CancelReversalTransition";
import { CaptureTransition } from "../../2-Domain/Usecases/CaptureTransition";
import { SearchTransition } from "../../2-Domain/Usecases/SearchTransition";
import { SendTransition } from "../../2-Domain/Usecases/SendTransition";
import { MappearTransicao } from "../Mappear/MappearTransicao";
import { CreateTransitionRequest } from "../Request/createTransitionRequest";


export class PaymentGatewaysController{

    constructor ( private readonly sendTransition: SendTransition,
                  private readonly searchTransition: SearchTransition,
                  private readonly captureTransition: CaptureTransition,
                  private readonly cancelReversalTransition: CancelReversalTransition) {}

    public sendTransitions (createTransicaoRequest: CreateTransitionRequest){

       const resultado = MappearTransicao.toDTO(createTransicaoRequest);
       this.sendTransition.execute(resultado);
    }

    public searchTransitions(paramNumPedido :string):any{

        return this.searchTransition.execute(paramNumPedido);
    }

    public captureTransitions(paramNumPedido:string){

        this.captureTransition.execute(paramNumPedido); 
    }

    public cancelReversalTransitions (paramNumPedido:string){

        this.cancelReversalTransition.execute(paramNumPedido)   
    }
}