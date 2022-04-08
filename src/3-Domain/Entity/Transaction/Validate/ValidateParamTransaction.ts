import { TransactionDTO } from '../../../../5-Shared/DTO/TransactionDTO';

export abstract class ValidateParamTransaction {
    static isValidSend(request: TransactionDTO) {
        const FIRST_MONTH = 1;
        const LAST_MONTH = 12;
        const NUMBER_ZERO = 0;
        const YEAR_CARACTER = 4;
        const NUMER_CARD_MAX = 19;
        const NUMBER_SECURITY_CODE_MAX = 4;

        if (request.expirationMonth < FIRST_MONTH || request.expirationMonth > LAST_MONTH) {
            throw new Error('Mes deverá ser representando por ' + FIRST_MONTH + ' a ' + LAST_MONTH);
        }

        if (request.expirationYear < NUMBER_ZERO) {
            throw new Error('Deverá ser representado por números positivos');
        }

        if (request.expirationYear.toFixed().length !== YEAR_CARACTER) {
            throw new Error('ExpirationYear deverá ser escrito com ' + YEAR_CARACTER + ' digitos.');
        }

        if (request.expirationYear < new Date().getFullYear() - 1) {
            throw new Error('Não poderá ser inferior ao ano atual');
        }

        if (request.cardSecurityCode.length > NUMBER_SECURITY_CODE_MAX) {
            throw new Error('CardSecurityCode deverá ter menos 4 caracter');
        }

        if (request.cardNumber.length > NUMER_CARD_MAX) {
            throw new Error('CardNumber deverá ter menos ' + NUMER_CARD_MAX + ' caracteres');
        }
    }
}
