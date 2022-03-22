import { IRegister } from "../Core/Interfaces/IRegister.js";
import { IRegisterSuccessError } from "../Core/Interfaces/IRegisterSucessError.js";

export class RegisterSuccessError implements IRegisterSuccessError{

    constructor( private readonly success: IRegister,
                 private readonly error: IRegister ){}

    registerSuccess(message: string){
        this.success.save(message);
    }

    registerError(message: string){
        this.error.save(message);
    }
}