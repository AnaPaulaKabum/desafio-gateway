import { ILogRepository } from "../../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository";
import { Log } from "../../../3-Domain/Entity/Log";

export class LogRepository implements ILogRepository{

    save(log: Log) {
         console.log('...LOG: '+log.message)
    }
}