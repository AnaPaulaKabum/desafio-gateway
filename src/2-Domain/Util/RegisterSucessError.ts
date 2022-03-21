import { IRegister } from "../Core/Interfaces/IRegister.js";
import { IRegisterSuccessError } from "../Core/Interfaces/RegisterSucessError.js";

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