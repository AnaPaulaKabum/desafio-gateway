import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister";

export class Log implements IRegister{
    
    save(message: string) {
        console.log('...LOG: '+message)
    }
}