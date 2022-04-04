export class Capture {
    numberRequest: string;
    amount: number;
    date: Date;
    nsu: string;

    isValid() {
        if (this.amount > 0) {
            if (!this.date) throw new Error('Campo date é obrigatório quando possui valor na captura');
            if (!this.nsu) throw new Error('Campo nsu é obrigatório quando possui valor na captura');
            if (!this.numberRequest) throw new Error('Campo numRequest é obrigatório quando possui valor na captura');
        }
    }
}
