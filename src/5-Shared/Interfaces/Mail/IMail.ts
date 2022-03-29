import { FieldMail } from '../../../3-Domain/Entity/Mail/FieldMail';

export interface IMail {
    send(fieldMail: FieldMail): Promise<any>;
}
