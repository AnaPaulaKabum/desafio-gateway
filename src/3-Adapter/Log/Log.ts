import { IRegister } from "../../2-Domain/Core/Interfaces/IRegister";

export class Log implements IRegister{
    
    save(mensagem: string) {
        throw new Error("Method not implemented.");
    }
}