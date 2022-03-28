import { FieldMail } from '../../Entity/FieldMail';

export interface IMail {
    send(fieldMail: FieldMail): Promise<any>;
}
