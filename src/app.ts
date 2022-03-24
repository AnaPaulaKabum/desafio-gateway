
import { LogRepository } from "./4-Adapter/Persistence/Log/LogRepository.js";
import { Mail } from "./4-Adapter/Mail/Mail.js";
import { PaymentGatewaysController } from "./1-Application/Controller/PaymentGatewaysController.js";
import { GatewaysRedeAdapter } from "./4-Adapter/Gateway/Rede/GatewaysRedeAdapter.js";
import { SendTransaction } from "./2-Usecases/Transaction/SendTransaction.js";
import { SearchTransaction } from "./2-Usecases/Transaction/SearchTransaction.js";
import { CaptureTransaction } from "./2-Usecases/Transaction/CaptureTransaction.js";
import { CancelReversalTransaction } from "./2-Usecases/Transaction/CancelReversalTransaction.js";
import { TransactionRepository } from "./4-Adapter/Persistence/Transaction/TransactionRepository.js";
import { CreateTransactionRequest } from "./1-Application/Request/createTransactionRequest.js";

export abstract class APP {

    static async start(){
        
        const TransactionServicesFactory = () =>{
            
            const gateway = new GatewaysRedeAdapter();
            const repositoryTransaction = new TransactionRepository()
            const repositoryLog = new LogRepository();
            const mail = new Mail();
            
            return {
                sendTransaction: new SendTransaction(gateway,repositoryTransaction,repositoryLog,mail),
                searchTransaction: new SearchTransaction(gateway,repositoryTransaction,repositoryLog,mail),
                captureTransaction: new CaptureTransaction(gateway,repositoryTransaction,repositoryLog,mail),
                cancelReversalTransaction: new CancelReversalTransaction(gateway,repositoryTransaction,repositoryLog,mail)
            }
        }
        
        //Design Patter composite root:
        const {sendTransaction,searchTransaction,captureTransaction,cancelReversalTransaction} = TransactionServicesFactory();
        const paymentGatewaysController = new PaymentGatewaysController(sendTransaction,searchTransaction,captureTransaction,cancelReversalTransaction);
        
        //const resultado = await paymentGatewaysController.sendTransactions(new CreateTransactionRequest());
        //const resultado = await paymentGatewaysController.searchTransactions('1');
        const resultado = await paymentGatewaysController.captureTransactions('1',100);
        console.log("----------");
        console.log("Resultado: ");
        console.log(resultado);
    }
}

APP.start();