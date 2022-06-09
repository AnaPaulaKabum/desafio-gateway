export type CancelOrderDTOType = {
    numberRequest?: string;
    date: Date;
    amount?: number;
    tid: string;
    nsu: string;
    authorizationCode: string;
};
