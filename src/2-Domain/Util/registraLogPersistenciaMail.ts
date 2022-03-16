import { IRegistra } from "../Core/Interfaces/IRegistra"

export class RegistraLogPersistenciaMail implements IRegistra{


    constructor( private readonly log : IRegistra,
                 private readonly mail: IRegistra,
                 private readonly persistencia: IRegistra ){}


    execute(mensagem: string) {
        this.log.execute(mensagem);
        this.mail.execute(mensagem);
        this.persistencia.execute(mensagem);
    }
}