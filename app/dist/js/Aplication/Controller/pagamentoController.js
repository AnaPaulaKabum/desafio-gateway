import { MappearTransicao } from "../Mappear/MappearTransicao";
export class PagamentoController {
    constructor(transcionarServices) {
        this.transcionarServices = transcionarServices;
    }
    enviarTransicao(createTransicaoRequest) {
        const result = MappearTransicao.toDTO(createTransicaoRequest);
        this.transcionarServices.enviarTransicao(result);
    }
    consultarTransicao() {
        this.transcionarServices.consultarTransicao();
    }
    capturarTransicao() {
    }
    cancelarTransicao() {
    }
}
