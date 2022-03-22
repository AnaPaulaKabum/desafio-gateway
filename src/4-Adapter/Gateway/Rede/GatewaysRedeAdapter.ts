
import { AdapterObjeto } from "./AdapterObjeto.js";
import { TransitionCreatedResponse } from "../../../3-Domain/Entity/TransitionCreatedResponse.js";
import { Transition } from "../../../3-Domain/Entity/Transition.js";
import { IGateways } from "../../../3-Domain/Core/Interfaces/IGateways.js";
import { MockSendTransition } from "./Mock/SendTransition.js";
import { ConverterReturnAPITo } from "./Converter/ConverterReturnAPITo.js";

export class GatewaysRedeAdapter implements IGateways{

    sendTransition(transition: Transition): TransitionCreatedResponse {

       console.log('..sendTransition(Adapter)');
       const transitionRedeRequest = AdapterObjeto.createTransitionRede(transition);
       const returnAPI = MockSendTransition.send(transitionRedeRequest);

       return ConverterReturnAPITo.converte(returnAPI);

    }

    consultarTranscionar(numPedido: string)  {

        // ao buscar será retornado um objeto TranscaoResponseAPI()
        //construir um MAPPER para transformar o retorno em TransacaoResponseDTO;
        
        //consulta na api
        //return new TransitionCreateResponse();
    }
    
    capturarTransicao(numPedido: string) {
       //enviar objeto:
       // {
       //  "amount": 2099   
       // }
    }
    cancelaExtornoTransicao(numPedido:string) {
        throw new Error("Method not implemented.");
    }
}