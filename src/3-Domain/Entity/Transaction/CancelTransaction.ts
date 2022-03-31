export class CancelTransaction {
    numberRequest: string;
    tid: string;
    nsu: string;
    date: Date;
    authorizationCode: string;

    isvalid() {
        if (this.numberRequest === undefined) throw new Error('Campo numberRequest é obrigatório');
        if (this.tid === undefined) throw new Error('Campo tid é obrigatório');
        if (this.nsu === undefined) throw new Error('Campo nsu é obrigatório');
        if (this.date === undefined) throw new Error('Campo date é obrigatório');
        if (this.authorizationCode === undefined) throw new Error('Campo authorizationCode é obrigatório');
    }
}
