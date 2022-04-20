import { CaptureOrderDTO } from '../../../Shared/DTO/Order/CaptureOrderDTO';

export class CaptureOrder {
    private constructor(
        private readonly _numberRequest: string,
        private readonly _amount: number,
        private readonly _date: Date,
        private readonly _nsu: string,
        private readonly _authorizationCode: string,
    ) {}

    get numberRequest(): string {
        return this._numberRequest;
    }
    get amount(): number {
        return this._amount;
    }
    get date(): Date {
        return this._date;
    }
    get nsu(): string {
        return this._nsu;
    }

    get authorizationCode(): string {
        return this._authorizationCode;
    }

    static createForDTO(captureOrderDTO: CaptureOrderDTO): CaptureOrder {
        return CaptureOrder.create(
            captureOrderDTO.numberRequest,
            captureOrderDTO.amount,
            captureOrderDTO.date,
            captureOrderDTO.nsu,
            captureOrderDTO.authorizationCode,
        );
    }

    static create(numberRequest: string, amount: number, date: Date, nsu: string, authorizationCode) {
        if (!numberRequest) throw new Error('Campo numberRequest é obrigatório');
        if (!date) throw new Error('Campo date é obrigatório q');
        if (!nsu) throw new Error('Campo nsu é obrigatório ');
        if (!authorizationCode) throw new Error('Campo authorizationCode é obrigatório');

        return new CaptureOrder(numberRequest, amount, date, nsu, authorizationCode);
    }
}
