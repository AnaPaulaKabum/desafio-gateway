
import { Log } from "./4-Adapter/Log/Log.js";
import { Mail } from "./4-Adapter/Mail/Mail.js";
import { Persistence } from "./4-Adapter/Persistence/Persistence.js";
import { PaymentGatewaysController } from "./1-Application/Controller/PaymentGatewaysController.js";
import { RegistraLogPersistenciaMail } from "./3-Domain/Util/registraLogPersistenciaMail.js";
import { GatewaysRedeAdapter } from "./4-Adapter/Gateway/Rede/GatewaysRedeAdapter.js";
import { SendTransaction } from "./2-Usecases/Transaction/SendTransaction.js";
import { SearchTransaction } from "./2-Usecases/Transaction/SearchTransaction.js";
import { CaptureTransaction } from "./2-Usecases/Transaction/CaptureTransaction.js";
import { CancelReversalTransaction } from "./2-Usecases/Transaction/CancelReversalTransaction.js";
import { TransactionRepository } from "./4-Adapter/Persistence/TransactionRepository.js";
import { RegisterSuccessError } from "./3-Domain/Util/RegisterSucessError.js";
import { CreateTransactionRequest } from "./1-Application/Request/createTransactionRequest.js";

const TransactionRepositoryFactory = () => {

    return new TransactionRepository();
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

const TransactionServicesFactory = () =>{

    const gateway = new GatewaysRedeAdapter();
    const repository = TransactionRepositoryFactory();
    const registerSuccess = registerSuccessFactory();
    const registerError = registerErrorFactory();
    const registerSuccessError = new RegisterSuccessError(registerSuccess,registerError); 

    return {
        sendTransaction: new SendTransaction(gateway,repository,registerSuccessError),
        searchTransaction: new SearchTransaction(gateway,registerSuccess,registerError),
        captureTransaction: new CaptureTransaction(gateway,registerSuccess,registerError),
        cancelReversalTransaction: new CancelReversalTransaction(gateway,registerSuccess,registerError)
    }
}

//Design Patter composite root:
const {sendTransaction,searchTransaction,captureTransaction,cancelReversalTransaction} = TransactionServicesFactory();
const app = new PaymentGatewaysController(sendTransaction,searchTransaction,captureTransaction,cancelReversalTransaction);

//const resultado = app.sendTransactions(new CreateTransactionRequest());
//const resultado = app.searchTransactions('1');
const resultado = app.captureTransactions('1',100);
console.log("----------");
console.log("Resultado: ");
console.log(resultado);