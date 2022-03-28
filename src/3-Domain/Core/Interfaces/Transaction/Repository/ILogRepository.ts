import { Log } from '../../../../Entity/Log';

export interface ILogRepository {
    save(log: Log): Promise<any>;
}
