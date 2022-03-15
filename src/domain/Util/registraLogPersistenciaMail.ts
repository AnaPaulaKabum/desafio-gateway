import { ILog } from "../Core/Interfaces/ILog";
import { IMail } from "../Core/Interfaces/IMail";
import { IPersistencia } from "../Core/Interfaces/IPersistencia";
import { IRegistra } from "../Core/Interfaces/IRegistra"

export class RegistraLogPersistenciaMail implements IRegistra{


    constructor( private readonly log : ILog,
                 private readonly mail: IMail,
                 private readonly persistencia: IPersistencia ){}


    execute(mensagem: string) {
        this.log.registraLog(mensagem);
        this.mail.enviarEmail(mensagem);
        this.persistencia.salvaAcao(mensagem);
    }
}