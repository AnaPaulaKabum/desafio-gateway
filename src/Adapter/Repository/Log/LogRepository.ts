import { ILogRepository } from '../../../Shared/Interfaces/Repository/ILogRepository';
import { Log } from '../../../Domain/Entity/Log/Log';

export class LogRepository implements ILogRepository {
    save(log: Log): Promise<any> {
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
}
