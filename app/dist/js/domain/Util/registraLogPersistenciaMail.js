export class RegistraLogPersistenciaMail {
    constructor(log, mail, persistencia) {
        this.log = log;
        this.mail = mail;
        this.persistencia = persistencia;
    }
    execute(mensagem) {
        this.log.registraLog(mensagem);
        this.mail.enviarEmail(mensagem);
        this.persistencia.salvaAcao(mensagem);
    }
}
