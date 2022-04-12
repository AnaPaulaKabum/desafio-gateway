export class RefundOrder {
    numberRequest: string;
    date: Date;
    id: string;
    amount: number;
    tid: string;
    nsu: string;
    authorizationCode: string;

    isvalid() {
        if (this.amount > 0) {
            if (!this.date) throw new Error('Campo date é obrigatório quando possui valor na refund');
            if (this.id === undefined) throw new Error('Campo id é obrigatório quando possui valor na refund');

            if (this.numberRequest === undefined) throw new Error('Campo numberRequest é obrigatório');
            if (this.tid === undefined) throw new Error('Campo tid é obrigatório');
            if (this.nsu === undefined) throw new Error('Campo nsu é obrigatório');
            if (this.date === undefined) throw new Error('Campo date é obrigatório');
            if (this.authorizationCode === undefined) throw new Error('Campo authorizationCode é obrigatório');
        }
    }
}
