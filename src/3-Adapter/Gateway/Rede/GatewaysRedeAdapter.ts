
import { AdapterObjeto } from "./AdapterObjeto";
import { TransitionCreateResponse } from "../../../2-Domain/Entity/TransitionCreateResponse";
import { Transition } from "../../../2-Domain/Entity/Transition";
import { IGateways } from "../../../2-Domain/Core/Interfaces/IGateways";

export class GatewaysRedeAdapter implements IGateways{

    enviarTranscionar(transacao:Transition) {

        const resultado = AdapterObjeto.criaTransicao(transacao);
        //Chamada do metodo Enviar e este deverá retornar objeto CriarTransicionarResponse.
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