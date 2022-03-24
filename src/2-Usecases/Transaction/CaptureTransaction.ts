import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister.js";
import { Transaction } from "../../3-Domain/Entity/Transaction.js";
import { MessageSucess } from "../../3-Domain/Util/MessageSuccess.js";

export class CaptureTransaction{

    constructor(private readonly gateway : IGateways,
                private readonly registraSucesso: IRegister,
                private readonly registraErro: IRegister){}
                
    public execute(numberRequest:string,amount:number): Transaction {

        try {
                console.log('..SendTransaction(UseCases)');
                const captureTranstion = this.gateway.captureTransaction(numberRequest,amount);
                this.registraSucesso.save(MessageSucess.generateMessage('Capturado Transição')); 
                return captureTranstion;
            
        } catch (error) {
            
            this.registraErro.save(error.message);
            return new Transaction();
        }
    }
}