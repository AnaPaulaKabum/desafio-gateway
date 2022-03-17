import { Transition } from "../../2-Domain/Entity/Transition";
import { CreateTransitionRequest } from "../Request/createTransitionRequest";

export abstract class MappearTransicao{

    //converte Objeto recebido pela Request para DTO.

    static toDTO(mappear:CreateTransitionRequest): Transition{

        return new Transition();
    }

}