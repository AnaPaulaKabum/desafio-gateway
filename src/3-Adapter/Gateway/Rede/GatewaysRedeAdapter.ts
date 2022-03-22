
import { AdapterObjeto } from "./AdapterObjeto.js";
import { TransitionCreateResponse } from "../../../2-Domain/Entity/TransitionCreateResponse.js";
import { Transition } from "../../../2-Domain/Entity/Transition.js";
import { IGateways } from "../../../2-Domain/Core/Interfaces/IGateways.js";
import { MockSendTransition } from "./Mock/SendTransition.js";
import { ConverterReturnAPITo } from "./Converter/ConverterReturnAPITo.js";

export class GatewaysRedeAdapter implements IGateways{


    sendTransition(transition: Transition) {

       console.log('..sendTransition(Adapter)');
       const transitionRedeRequest = AdapterObjeto.createTransitionRede(transition);
       const returnAPI = MockSendTransition.send(transitionRedeRequest);

       ConverterReturnAPITo.converte(returnAPI);

       //return retornoAPI;
    }

    consultarTranscionar(numPedido: string): TransitionCreateResponse {

        // ao buscar será retornado um objeto TranscaoResponseAPI()
        //construir um MAPPER para transformar o retorno em TransacaoResponseDTO;
        
        //consulta na api
        return new TransitionCreateResponse();
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