import { IMail } from "../../3-Domain/Core/Interfaces/IMail";
import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister";

export class Mail implements IMail{

    send() {
        console.log('...MAIL: Enviado email')
    }
}