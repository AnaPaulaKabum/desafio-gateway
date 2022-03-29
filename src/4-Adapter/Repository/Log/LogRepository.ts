import { ILogRepository } from '../../../5-Shared/Interfaces/Repository/ILogRepository';
import { Log } from '../../../3-Domain/Entity/Log/Log';

export class LogRepository implements ILogRepository {
    save(log: Log): Promise<any> {
        console.log('...LOG: ' + JSON.stringify(log));
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
}
