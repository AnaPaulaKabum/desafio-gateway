import { IRegistra } from "../../2-Domain/Core/Interfaces/IRegistra";

export class Log implements IRegistra{
    
    execute(mensagem: string) {
        throw new Error("Method not implemented.");
    }
}