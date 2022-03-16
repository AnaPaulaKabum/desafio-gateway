import { TransacaoDTO } from "../../2-Domain/DTO/TransacaoDTO";
import { CreateTransicaoRequest } from "../Request/createTransicaoRequest";

export abstract class MappearTransicao{

    //converte Objeto recebido pela Request para DTO.

    static toDTO(mappear:CreateTransicaoRequest): TransacaoDTO{

        return new TransacaoDTO();
    }

}