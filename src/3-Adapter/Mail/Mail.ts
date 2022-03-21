import { IRegister } from "../../2-Domain/Core/Interfaces/IRegister";

export class Mail implements IRegister{

    save(mensagem: string) {
        console.log('...MAIL: '+mensagem)
    }
}