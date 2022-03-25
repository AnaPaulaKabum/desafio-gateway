import { IMail } from '../../3-Domain/Core/Interfaces/IMail';

export class Mail implements IMail {
    send() {
        console.log('...MAIL: Enviado email');
    }
}
