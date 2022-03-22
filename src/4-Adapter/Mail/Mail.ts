import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister";

export class Mail implements IRegister{

    save(message: string) {
        console.log('...MAIL: '+message)
    }
}