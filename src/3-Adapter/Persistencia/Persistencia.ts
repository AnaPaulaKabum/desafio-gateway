import { IRegistra } from "../../2-Domain/Core/Interfaces/IRegistra";

export class Persistencia implements IRegistra{
    
    execute(mensagem: string) {
        throw new Error("Method not implemented.");
    }


}