import { CaptureOrder } from '../CaptureOrder';

type SutTypes = {
    numberRequest: string;
    amount: number;
    date: Date;
    nsu: string;
};

const makeSut = (): SutTypes => {
    const numberRequest = '100';
    const amount = 100;
    const date = new Date();
    const nsu = '100';

    return { numberRequest, amount, date, nsu };
};

describe('CaptureOrder', () => {
    test('Should return not error if correct param', () => {
        let { numberRequest, amount, date, nsu } = makeSut();
        const transaction = CaptureOrder.create(numberRequest, amount, date, nsu);
        expect(transaction).toBeTruthy();
        expect(transaction).toBeInstanceOf(CaptureOrder);
    });
});
