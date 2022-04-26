import { BrandCard } from '../../Enum/BrandCard';
import { NumberCard } from './ValueObject/Card/NumberCard';
import { SecurityCode } from './ValueObject/Card/SecurityCode';

export class Card {
    private readonly _number: NumberCard;
    private readonly _name: string;
    private readonly _expirationMonth: number;
    private readonly _expirationYear: number;
    private readonly _securityCode: SecurityCode;
    private readonly _brand?: BrandCard;

    constructor(
        number: string,
        name: string,
        expirationMonth: number,
        expirationYear: number,
        securityCode: string,
        brand?: BrandCard,
    ) {
        const FIRST_MONTH = 1;
        const LAST_MONTH = 12;
        const NUMBER_ZERO = 0;
        const YEAR_CARACTER = 4;
        const NUMBER_SECURITY_CODE_MAX = 4;

        this._number = NumberCard.create(number);

        if (!name) throw new Error('name deverá ser informado');
        if (expirationMonth < FIRST_MONTH || expirationMonth > LAST_MONTH)
            throw new Error('Mes deverá ser representando por ' + FIRST_MONTH + ' a ' + LAST_MONTH);
        if (expirationYear < NUMBER_ZERO) throw new Error('Deverá ser representado por números positivos');
        if (expirationYear.toFixed().length !== YEAR_CARACTER)
            throw new Error('ExpirationYear deverá ser escrito com ' + YEAR_CARACTER + ' digitos.');
        if (expirationYear < new Date().getFullYear() - 1) throw new Error('Não poderá ser inferior ao ano atual');
        if (securityCode.length > NUMBER_SECURITY_CODE_MAX)
            throw new Error('CardSecurityCode deverá ter menos ' + NUMBER_SECURITY_CODE_MAX + ' caracter');

        this._securityCode = SecurityCode.create(securityCode);

        let brandCard = brand;
        if (!brandCard) {
            brandCard = Card.discoverBrand(number);
        }

        this._name = name;
        this._expirationMonth = expirationMonth;
        this._expirationYear = expirationYear;
        this._brand = brandCard;
    }

    get number(): string {
        return this._number.number;
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
        return this._securityCode.securityCode;
    }

    get brand(): BrandCard | undefined {
        return this._brand;
    }

    private static discoverBrand(numberCard: string): BrandCard {
        return BrandCard.MASTER;
    }
}
