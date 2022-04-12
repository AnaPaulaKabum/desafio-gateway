import { FieldMail } from '../../../Domain/Entity/Mail/FieldMail';

export interface IMail {
    send(fieldMail: FieldMail): Promise<any>;
}
