import { IRegister } from "../Core/Interfaces/IRegister.js"

export class RegistraLogPersistenciaMail implements IRegister{

    constructor( private readonly log : IRegister,
                 private readonly mail: IRegister,
                 private readonly persistencia: IRegister ){}

    save(message: string) {
        this.log.save(message);
        this.mail.save(message);
        this.persistencia.save(message);
    }
}