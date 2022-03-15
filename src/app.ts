import { AdapterGatewaysRede } from "./Adapter/AdapterRede/AdapterGatewaysRede";
import { Log } from "./Adapter/Log/Log";
import { Mail } from "./Adapter/Mail/Mail";
import { Persistencia } from "./Adapter/Persistencia/Persistencia";
import { PagamentoController } from "./Aplication/Controller/pagamentoController";
import { TranscionarServices } from "./domain/services/transicionarServices";
import { RegistraLogPersistenciaMail } from "./domain/Util/registraLogPersistenciaMail";


const log = new Log();
const mail = new Mail();
const persistencia = new Persistencia()
const registroSucesso = new Persistencia();
const registroErro = new RegistraLogPersistenciaMail(log,mail,persistencia);

const gateway = new AdapterGatewaysRede();

const service = new TranscionarServices(gateway,registroSucesso,registroErro);

const app = new PagamentoController(service);