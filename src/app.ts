
/*import { Log } from "./3-Adapter/Log/Log";
import { Mail } from "./3-Adapter/Mail/Mail";
import { Persistencia } from "./3-Adapter/Persistencia/Persistencia";
import { PaymentGatewaysController } from "./1-Application/Controller/PaymentGatewaysController";
import { RegistraLogPersistenciaMail } from "./2-Domain/Util/registraLogPersistenciaMail";
import { GatewaysRedeAdapter } from "./3-Adapter/Gateway/Rede/GatewaysRedeAdapter";
import { SendTransition } from "./2-Domain/Usecases/SendTransition";
import { SearchTransition } from "./2-Domain/Usecases/SearchTransition";
import { CaptureTransition } from "./2-Domain/Usecases/CaptureTransition";
import { CancelReversalTransition } from "./2-Domain/Usecases/CancelReversalTransition";

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
    const gateway = new GatewaysRedeAdapter();

    return {
        sendTransition: new SendTransition(gateway,registroSucesso,registroErro),
        searchTransition: new SearchTransition(gateway,registroSucesso,registroErro),
        captureTransition: new CaptureTransition(gateway,registroSucesso,registroErro),
        cancelReversalTransition: new CancelReversalTransition(gateway,registroSucesso,registroErro)
    }
}

//Design Patter composite root:
const {sendTransition,searchTransition,captureTransition,cancelReversalTransition} = transcionarServicesFactory();
const app = new PaymentGatewaysController(sendTransition,searchTransition,captureTransition,cancelReversalTransition);*/

console.log('teste')