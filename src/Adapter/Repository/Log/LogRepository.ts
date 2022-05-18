import { ILogRepository } from '../../../Shared/Interfaces/Repository/ILogRepository';
import { Log } from '../../../Domain/Entity/Log/Log';
import { Repository } from 'typeorm';
import { LogEntity } from '../Entity/Log.entity';

export class LogRepository extends Repository<LogEntity> implements ILogRepository {
    register(log: Log): Promise<any> {
        const logEntity = new LogEntity();
        logEntity.date = log.date;
        logEntity.descripto = log.message;
        logEntity.userCode = 100;
        logEntity.process = log.statusLog;

        return this.manager.save(logEntity);
    }
}
