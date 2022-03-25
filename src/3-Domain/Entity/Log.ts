import { StatusLog } from '../Core/Interfaces/Transaction/Enum/StatusLog.js';

export class Log {
    public message: string;
    public user: string;
    public statusLog: StatusLog;
    public date: Date;
}
