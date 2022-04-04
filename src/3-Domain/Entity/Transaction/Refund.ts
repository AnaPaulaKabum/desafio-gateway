export class Refund {
    date: Date;
    id: string;
    amount: number;

    isvalid() {
        if (this.amount > 0) {
            if (!this.date) throw new Error('Campo date é obrigatório quando possui valor na refund');
            if (this.id === undefined) throw new Error('Campo id é obrigatório quando possui valor na refund');
        }
    }
}
