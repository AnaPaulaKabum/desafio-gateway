export class TranscionarServices {
    constructor(gateway, registra) {
        this.gateway = gateway;
        this.registra = registra;
    }
    enviarTransicao(conteudo) {
        try {
            this.enviarTransicao(conteudo);
        }
        catch (error) {
            this.registra.execute(error.message);
        }
    }
    consultarTransicao() {
    }
}
