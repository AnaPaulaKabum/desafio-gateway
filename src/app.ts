import { AdapterGatewaysRede } from "./3-Adapter/AdapterRede/AdapterGatewaysRede";
import { Log } from "./3-Adapter/Log/Log";
import { Mail } from "./3-Adapter/Mail/Mail";
import { Persistencia } from "./3-Adapter/Persistencia/Persistencia";
import { PagamentoGatewaysController } from "./1-Application/Controller/PagamentoGatewaysController";
import { TranscionarServices } from "./2-Domain/services/transicionarServices";
import { RegistraLogPersistenciaMail } from "./2-Domain/Util/registraLogPersistenciaMail";

const registroSucessoFactory = () =>{

    return new Persistencia();
}

const registroErroFactory = () => {

    const log = new Log();
    const mail = new Mail();
    const persistencia = new Persistencia()

    return new RegistraLogPersistenciaMail(log,mail,persistencia);
}

const transcionarServicesFactory = () =>{

    const registroSucesso  = registroSucessoFactory();
    const registroErro = registroErroFactory();
    const gateway = new AdapterGatewaysRede();

    return new TranscionarServices(gateway,registroSucesso,registroErro);
}

//Design Patter composite root:

const service = transcionarServicesFactory();
const app = new PagamentoGatewaysController(service);