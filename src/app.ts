
import { Log } from "./4-Adapter/Log/Log.js";
import { Mail } from "./4-Adapter/Mail/Mail.js";
import { Persistence } from "./4-Adapter/Persistence/Persistence.js";
import { PaymentGatewaysController } from "./1-Application/Controller/PaymentGatewaysController.js";
import { RegistraLogPersistenciaMail } from "./3-Domain/Util/registraLogPersistenciaMail.js";
import { GatewaysRedeAdapter } from "./4-Adapter/Gateway/Rede/GatewaysRedeAdapter.js";
import { SendTransition } from "./2-Usecases/Transition/SendTransition.js";
import { SearchTransition } from "./2-Usecases/Transition/SearchTransition.js";
import { CaptureTransition } from "./2-Usecases/Transition/CaptureTransition.js";
import { CancelReversalTransition } from "./2-Usecases/Transition/CancelReversalTransition.js";
import { TransitionRepository } from "./4-Adapter/Persistence/TransitionRepository.js";
import { RegisterSuccessError } from "./3-Domain/Util/RegisterSucessError.js";
import { CreateTransitionRequest } from "./1-Application/Request/createTransitionRequest.js";

const transitionRepositoryFactory = () => {

    return new TransitionRepository();
}

const registerSuccessFactory = () =>{

    return new Persistence();
}

const registerErrorFactory = () => {

    const log = new Log();
    const mail = new Mail();
    const persistencia = new Persistence()

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

//const resultado = app.sendTransitions(new CreateTransitionRequest());
//const resultado = app.searchTransitions('1');
const resultado = app.captureTransitions('1',100);
console.log("----------");
console.log("Resultado: ");
console.log(resultado);