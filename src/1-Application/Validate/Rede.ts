import { ParamValidateType } from '../../5-Shared/Interfaces/Gateway/ParamValidateType';

export const configRede = (): ParamValidateType => {
    const numberRequest_MAX = 16;

    return { numberRequest_MAX };
};
