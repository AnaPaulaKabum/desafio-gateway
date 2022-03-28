import { FieldMail } from '../../Entity/Mail/FieldMail';

export interface IMail {
    send(fieldMail: FieldMail): Promise<any>;
}
