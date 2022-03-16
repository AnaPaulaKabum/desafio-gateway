import { ITransacao } from "../../domain/Core/Interfaces/ITransacao";
import { Transacao } from "./Transacao";

export abstract class AdapterObjeto{


    static criaTransicao(transicao: ITransacao):Transacao{

        return new Transacao();
    }


}