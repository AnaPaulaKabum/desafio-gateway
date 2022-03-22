
import { AdapterObjeto } from "./AdapterObjeto.js";
import { TransitionCreatedResponse } from "../../../3-Domain/Entity/TransitionCreatedResponse.js";
import { Transition } from "../../../3-Domain/Entity/Transition.js";
import { IGateways } from "../../../3-Domain/Core/Interfaces/IGateways.js";
import { MockSendTransition } from "./Mock/SendTransition.js";
import { ConverterReturnAPIToTransitionCreatedResponse } from "./Converter/ConverterReturnAPIToTransitionCreatedResponse.js";

export class GatewaysRedeAdapter implements IGateways{

    sendTransition(transition: Transition): TransitionCreatedResponse {

       console.log('..sendTransition(Adapter)');
       const transitionRedeRequest = AdapterObjeto.createTransitionRede(transition);
       const returnAPI = MockSendTransition.send(transitionRedeRequest);

       return ConverterReturnAPIToTransitionCreatedResponse.converte(returnAPI);
    }

    consultarTranscionar(numberRequest: string)  {

        // ao buscar será retornado um objeto TranscaoResponseAPI()
        //construir um MAPPER para transformar o retorno em TransacaoResponseDTO;
        
        //consulta na api
        //return new TransitionCreateResponse();
    }
    
    capturarTransicao(numberRequest: string) {
       //enviar objeto:
       // {
       //  "amount": 2099   
       // }
    }
    cancelaExtornoTransicao(numberRequest:string) {
        throw new Error("Method not implemented.");
    }
}