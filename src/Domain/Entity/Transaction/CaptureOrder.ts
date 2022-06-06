import { CaptureOrderDTOType } from '../../../Shared/DTO/Order/CaptureOrderDTOType';

export class CaptureOrder {
    public id;
    constructor(
        private readonly _numberRequest: string,
        private readonly _amount: number,
        private readonly _date: Date,
        private readonly _nsu: string,
        private readonly _authorizationCode: string,
    ) {
        if (!_numberRequest) throw new Error('Campo numberRequest é obrigatório');
        if (!_date) throw new Error('Campo date é obrigatório q');
        if (!_nsu) throw new Error('Campo nsu é obrigatório ');
        if (!_authorizationCode) throw new Error('Campo authorizationCode é obrigatório');
    }

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

    static createForDTO(captureOrderDTO: CaptureOrderDTOType): CaptureOrder {
        return new CaptureOrder(
            captureOrderDTO.numberRequest,
            captureOrderDTO.amount || 0,
            captureOrderDTO.date,
            captureOrderDTO.nsu,
            captureOrderDTO.authorizationCode,
        );
    }
}
