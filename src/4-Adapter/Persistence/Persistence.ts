import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister";

export class Persistence implements IRegister{
    
    save(message: string) {
        console.log('...Persistencia: '+message)
    }


}