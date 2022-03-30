import { Transaction } from './Transaction.js';

class Capture {
    captured: boolean;
    amount: string;
    date: Date;
}

export class TransactionComplete {
    transaction: Transaction;
    capture: Capture;

    isValid() {
        this.transaction.isValid();
    }
}
