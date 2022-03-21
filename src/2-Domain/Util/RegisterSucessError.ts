import { IRegister } from "../Core/Interfaces/IRegister";
import { IRegisterSuccessError } from "../Core/Interfaces/RegisterSucessError";

export class RegisterSuccessError implements IRegisterSuccessError{

    
    constructor( private readonly success: IRegister,
                 private readonly error: IRegister ){}


    registerSuccess(){
        this.success.save("Teste");
    }

    registerError(){
        this.error.save("Teste");
    }


}