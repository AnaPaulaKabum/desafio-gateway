import { Log } from '../../../../Entity/Log/Log';

export interface ILogRepository {
    save(log: Log): Promise<any>;
}
