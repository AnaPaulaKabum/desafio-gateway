export class CancelTransaction {
    numberRequest: string;
    nsu: string;
    date: Date;
    authorizationCode: string;

    isvalid() {
        if (this.numberRequest === undefined) throw new Error('Campo numberRequest é obrigatório');
        if (this.nsu === undefined) throw new Error('Campo nsu é obrigatório');
        if (this.date === undefined) throw new Error('Campo date é obrigatório');
        if (this.authorizationCode === undefined) throw new Error('Campo authorizationCode é obrigatório');
    }
}
