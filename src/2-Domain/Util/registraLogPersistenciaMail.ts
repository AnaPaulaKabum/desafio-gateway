import { IRegister } from "../Core/Interfaces/IRegister.js"

export class RegistraLogPersistenciaMail implements IRegister{


    constructor( private readonly log : IRegister,
                 private readonly mail: IRegister,
                 private readonly persistencia: IRegister ){}


    save(mensagem: string) {
        this.log.save(mensagem);
        this.mail.save(mensagem);
        this.persistencia.save(mensagem);
    }
}