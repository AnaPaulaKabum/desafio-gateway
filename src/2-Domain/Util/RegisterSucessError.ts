import { IRegister } from "../Core/Interfaces/IRegister.js";
import { IRegisterSuccessError } from "../Core/Interfaces/RegisterSucessError.js";

export class RegisterSuccessError implements IRegisterSuccessError{

    
    constructor( private readonly success: IRegister,
                 private readonly error: IRegister ){}


    registerSuccess(mensagem: string){
        this.success.save(mensagem);
    }

    registerError(mensagem: string){
        this.error.save(mensagem);
    }


}