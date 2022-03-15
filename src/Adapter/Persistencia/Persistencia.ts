import { IRegistra } from "../../domain/Core/Interfaces/IRegistra";

export class Persistencia implements IRegistra{
    
    execute(mensagem: string) {
        throw new Error("Method not implemented.");
    }


}