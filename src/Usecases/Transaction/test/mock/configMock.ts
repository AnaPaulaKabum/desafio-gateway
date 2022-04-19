import { ParamValidateType } from '../../../../Shared/Interfaces/Gateway/ParamValidateType';

export const configMock = (): ParamValidateType => {
    const numberRequest_MAX = 16;
    const installments_MIN = 2;
    const installments_MAX = 12;
    const cardholderName_MAX = 30;
    const softDescriptor_MAX = 18;
    const amount_MAX = 10;

    return {
        numberRequest_MAX,
        installments_MIN,
        installments_MAX,
        cardholderName_MAX,
        softDescriptor_MAX,
        amount_MAX,
    };
};
