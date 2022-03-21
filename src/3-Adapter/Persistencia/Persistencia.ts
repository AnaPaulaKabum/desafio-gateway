import { IRegister } from "../../2-Domain/Core/Interfaces/IRegister";

export class Persistencia implements IRegister{
    
    save(mensagem: string) {
        console.log('...Persistencia: '+mensagem)
    }


}