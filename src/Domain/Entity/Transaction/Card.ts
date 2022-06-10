import { BrandCard } from '../../Enum/BrandCard';
import { ExpirationMonthCard } from '../../ValueObject/Card/ExpirationMonthCard';
import { ExpirationYearCard } from '../../ValueObject/Card/ExpirationYearCard';
import { NameCard } from '../../ValueObject/Card/NameCard';
import { NumberCard } from '../../ValueObject/Card/NumberCard';
import { SecurityCode } from '../../ValueObject/Card/SecurityCode';

export class Card {
    private readonly _number: NumberCard;
    private readonly _name: NameCard;
    private readonly _expirationMonth: ExpirationMonthCard;
    private readonly _expirationYear: ExpirationYearCard;
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
        this._number = NumberCard.create(number);
        this._name = NameCard.create(name);
        this._expirationMonth = ExpirationMonthCard.create(expirationMonth);
        this._expirationYear = ExpirationYearCard.create(expirationYear);
        this._securityCode = SecurityCode.create(securityCode);

        let brandCard = brand;
        if (!brandCard) {
            brandCard = this.discoverBrand(this._number);
        }
        this._brand = brandCard;
    }

    get number(): string {
        return this._number.get();
    }

    get name(): string {
        return this._name.get();
    }

    get expirationMonth(): number {
        return this._expirationMonth.get();
    }

    get expirationYear(): number {
        return this._expirationYear.get();
    }

    get securityCode(): string {
        return this._securityCode.get();
    }

    get brand(): BrandCard | undefined {
        return this._brand;
    }

    discoverBrand(numberCard: NumberCard): BrandCard {
        return BrandCard.MASTER;
    }
}
