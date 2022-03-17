
import { AdapterObjeto } from "./AdapterObjeto";
import { TransitionResponse } from "../../../2-Domain/Entity/TransitionResponse";
import { Transition } from "../../../2-Domain/Entity/Transition";
import { IGateways } from "../../../2-Domain/Core/Interfaces/IGateways";

export class GatewaysRedeAdapter implements IGateways{

    enviarTranscionar(transacao:Transition) {

        const resultado = AdapterObjeto.criaTransicao(transacao);
        //Chamada do metodo Enviar e este deverá retornar objeto CriarTransicionarResponse.
    }

    consultarTranscionar(numPedido: string): TransitionResponse {

        // ao buscar será retornado um objeto TranscaoResponseAPI()
        //construir um MAPPER para transformar o retorno em TransacaoResponseDTO;
        
        //consulta na api
        return new TransitionResponse();
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