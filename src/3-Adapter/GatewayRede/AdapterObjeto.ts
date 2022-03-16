import { ITransacao } from "../../2-Domain/Core/Interfaces/ITransacao";
import { TransacaoRede } from "./TransacaoRede";

export abstract class AdapterObjeto{

    static criaTransicao(transicao: ITransacao):TransacaoRede{

        return new TransacaoRede();
    }
}