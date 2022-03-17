import { ITransition } from "../../../2-Domain/Core/Interfaces/ITransition";
import { TransacaoRede } from "./TransacaoRede";

export abstract class AdapterObjeto{

    static criaTransicao(transicao: ITransition):TransacaoRede{

        return new TransacaoRede();
    }
}