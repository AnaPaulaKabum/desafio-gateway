import { ILogRepository } from '../../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository';
import { Log } from '../../../3-Domain/Entity/Log/Log';

export class LogRepository implements ILogRepository {
    save(log: Log): Promise<any> {
        console.log('...LOG: ' + log.message);
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
}
