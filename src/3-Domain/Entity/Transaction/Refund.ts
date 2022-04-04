export class Refund {
    date: Date;
    id: string;
    amount: number;

    isvalid() {
        if (this.amount > 0) {
            if (!this.date) throw new Error('Campo date é obrigatório quando possui valor na captura');
            if (!this.id) throw new Error('Campo nsu é obrigatório quando possui valor na captura');
        }
    }
}
