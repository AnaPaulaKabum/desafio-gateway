import { BrandCard } from '../../Enum/BrandCard';

export class Card {
    constructor(
        private readonly _number: string,
        private readonly _name: string,
        private readonly _expirationMonth: number,
        private readonly _expirationYear: number,
        private readonly _securityCode: string,
        private readonly _brand?: BrandCard,
    ) {
        const FIRST_MONTH = 1;
        const LAST_MONTH = 12;
        const NUMBER_ZERO = 0;
        const YEAR_CARACTER = 4;
        const NUMER_CARD_MAX = 19;
        const NUMBER_SECURITY_CODE_MAX = 4;

        if (_number.length > NUMER_CARD_MAX)
            throw new Error('CardNumber deverá ter menos ' + NUMER_CARD_MAX + ' caracteres');
        if (!_name) throw new Error('name deverá ser informado');
        if (_expirationMonth < FIRST_MONTH || _expirationMonth > LAST_MONTH)
            throw new Error('Mes deverá ser representando por ' + FIRST_MONTH + ' a ' + LAST_MONTH);
        if (_expirationYear < NUMBER_ZERO) throw new Error('Deverá ser representado por números positivos');
        if (_expirationYear.toFixed().length !== YEAR_CARACTER)
            throw new Error('ExpirationYear deverá ser escrito com ' + YEAR_CARACTER + ' digitos.');
        if (_expirationYear < new Date().getFullYear() - 1) throw new Error('Não poderá ser inferior ao ano atual');
        if (_securityCode.length > NUMBER_SECURITY_CODE_MAX)
            throw new Error('CardSecurityCode deverá ter menos ' + NUMBER_SECURITY_CODE_MAX + ' caracter');

        let brandCard = _brand;
        if (!brandCard) {
            brandCard = Card.discoverBrand(_number);
        }

        this._number = _number;
        this._name = _name;
        this._expirationMonth = _expirationMonth;
        this._expirationYear = _expirationYear;
        this._securityCode = _securityCode;
        this._brand = brandCard;
    }

    get number(): string {
        return this._number;
    }

    get name(): string {
        return this._name;
    }

    get expirationMonth(): number {
        return this._expirationMonth;
    }

    get expirationYear(): number {
        return this._expirationYear;
    }

    get securityCode(): string {
        return this._securityCode;
    }

    get brand(): BrandCard | undefined {
        return this._brand;
    }

    private static discoverBrand(numberCard: string): BrandCard {
        return BrandCard.MASTER;
    }
}
