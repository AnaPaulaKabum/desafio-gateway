import { AdapterGatewaysRede } from "./Adapter/AdapterRede/AdapterGatewaysRede";
import { Log } from "./Adapter/Log/Log";
import { Mail } from "./Adapter/Mail/Mail";
import { Persistencia } from "./Adapter/Persistencia/Persistencia";
import { PagamentoGatewaysController } from "./Aplication/Controller/PagamentoGatewaysController";
import { TranscionarServices } from "./domain/services/transicionarServices";
import { RegistraLogPersistenciaMail } from "./domain/Util/registraLogPersistenciaMail";

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