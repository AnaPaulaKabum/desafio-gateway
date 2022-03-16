import { IGateways } from "../../2-Domain/Core/Interfaces/IGateways";
import { ITransacao } from "../../2-Domain/Core/Interfaces/ITransacao";
import { TransacaoDTO } from "../../2-Domain/DTO/TransacaoDTO";
import { TransacaoResponseDTO } from "../../2-Domain/DTO/TransacaoResponseDTO";
import { AdapterObjeto } from "./AdapterObjeto";
import { TranscaoResponseAPI } from "./Response/TrasacaoResponseAPI";

export class GatewaysRedeAdapter implements IGateways{

    enviarTranscionar(transacao:TransacaoDTO) {

        const resultado = AdapterObjeto.criaTransicao(transacao);
        //Chamada do metodo Enviar e este deverá retornar objeto CriarTransicionarResponse.
    }

    consultarTranscionar(numPedido: string): TransacaoResponseDTO {

        // ao buscar será retornado um objeto TranscaoResponseAPI()
        //construir um MAPPER para transformar o retorno em TransacaoResponseDTO;
        
        //consulta na api
        return new TransacaoResponseDTO();
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