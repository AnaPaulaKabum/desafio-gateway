import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister.js";
import { Transaction } from "../../3-Domain/Entity/Transaction.js";
import { MessageSucess } from "../../3-Domain/Util/MessageSuccess.js";

export class SearchTransaction{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}

    public execute(numberRequest:string): Transaction{

        try {
             const resultado = this.gateway.searchTransaction(numberRequest)
             this.registraSucesso.save(MessageSucess.generateMessage('Consultado Transição')); 
             return resultado 

        } catch (error) {
            
            this.registraErro.save(error.message);
            throw(error);
        }
    }
}