
import { Log } from "./3-Adapter/Log/Log.js";
import { Mail } from "./3-Adapter/Mail/Mail.js";
import { Persistencia } from "./3-Adapter/Persistencia/Persistencia.js";
import { PaymentGatewaysController } from "./1-Application/Controller/PaymentGatewaysController.js";
import { RegistraLogPersistenciaMail } from "./2-Domain/Util/registraLogPersistenciaMail.js";
import { GatewaysRedeAdapter } from "./3-Adapter/Gateway/Rede/GatewaysRedeAdapter.js";
import { SendTransition } from "./2-Domain/Usecases/SendTransition.js";
import { SearchTransition } from "./2-Domain/Usecases/SearchTransition.js";
import { CaptureTransition } from "./2-Domain/Usecases/CaptureTransition.js";
import { CancelReversalTransition } from "./2-Domain/Usecases/CancelReversalTransition.js";
import { TransitionRepository } from "./3-Adapter/Persistencia/TransitionRepository.js";
import { RegisterSuccessError } from "./2-Domain/Util/RegisterSucessError.js";
import { CreateTransitionRequest } from "./1-Application/Request/createTransitionRequest.js";

const transitionRepositoryFactory = () => {

    return new TransitionRepository();
}

const registerSuccessFactory = () =>{

    return new Persistencia();
}

const registerErrorFactory = () => {

    const log = new Log();
    const mail = new Mail();
    const persistencia = new Persistencia()

    return new RegistraLogPersistenciaMail(log,mail,persistencia);
}

const transitionServicesFactory = () =>{

    const gateway = new GatewaysRedeAdapter();
    const repository = transitionRepositoryFactory();
    const registerSuccess = registerSuccessFactory();
    const registerError = registerErrorFactory();
    const registerSuccessError = new RegisterSuccessError(registerSuccess,registerError); 

    return {
        sendTransition: new SendTransition(gateway,repository,registerSuccessError),
        searchTransition: new SearchTransition(gateway,registerSuccess,registerError),
        captureTransition: new CaptureTransition(gateway,registerSuccess,registerError),
        cancelReversalTransition: new CancelReversalTransition(gateway,registerSuccess,registerError)
    }
}

//Design Patter composite root:
const {sendTransition,searchTransition,captureTransition,cancelReversalTransition} = transitionServicesFactory();
const app = new PaymentGatewaysController(sendTransition,searchTransition,captureTransition,cancelReversalTransition);

console.log(app.sendTransitions(new CreateTransitionRequest()));