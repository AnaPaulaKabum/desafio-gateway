import { TransitionRede } from "../TransitionRede.js";

export abstract class MockSendTransition{

    static send(transition: TransitionRede){
        
        return {
        reference: "pedido123",
        tid: "8345000363484052380",
        nsu: "663206341",
        authorizationCode: "186376",
        dateTime: "2017-02-28T08:54:00.000-03:00",
        amount: 2099,
        installments: 2,
        cardBin: "544828",
        last4: "0007",
        returnCode: "00",
        returnMessage: "Success.",
        brandTid: "226332",
        links: [
        {
            method: "GET",
            rel: "transaction",
            href: "https://sandbox-erede.useredecloud.com.br/v1/transactions/8345000363484052380"
        },
        {
            method: "PUT",
            rel: "capture",
            href: "https://sandbox-erede.useredecloud.com.br/v1/transactions/8345000363484052380"
        },
        {
            method: "POST",
            rel: "refund",
            href: "https://sandbox-erede.useredecloud.com.br/v1/transactions/8345000363484052380/refunds"
        }
        ]
    }
  }
}

