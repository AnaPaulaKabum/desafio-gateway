import { TransacaoDTO } from "../../DTO/TransacaoDTO";
import { TransacaoResponseDTO } from "../../DTO/TransacaoResponseDTO";

export interface IGateways {

    enviarTranscionar(conteudo: TransacaoDTO):any;
    //TransacaoResponseDTO pois irá trazer mais informações do que o TransacaoDTO
    consultarTranscionar(numPedido:string):TransacaoResponseDTO;
    capturarTransicao(numPedido:string):any;
    cancelaExtornoTransicao(numPedido:string):any;
}