import { Log } from '../../../../Domain/Entity/Log/Log';
import { ILogRepository } from '../../../../Shared/Interfaces/Repository/ILogRepository';

export class LogRepositoryMock implements ILogRepository {
    save(log: Log): Promise<any> {
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
}
