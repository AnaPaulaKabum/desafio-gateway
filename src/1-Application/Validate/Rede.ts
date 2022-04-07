import { ParamValidateType } from '../../5-Shared/Interfaces/Gateway/ParamValidateType';

export const configRede = (): ParamValidateType => {
    const numberRequest_MAX = 16;
    const installments_MIN = 2;
    const installments_MAX = 12;
    const cardholderName_MAX = 30;

    return { numberRequest_MAX, installments_MIN, installments_MAX, cardholderName_MAX };
};
