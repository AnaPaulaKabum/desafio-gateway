export abstract class MockSearchTransaction{

    static search(paramNumberRequest: string): Promise<any>{

        const returnSearch =  {
            requestDateTime: "2017-03-12T08:54:00.000-03:00",
            authorization: {
              dateTime: "2017-03-11T08:54:00.000-03:00",
              returnCode: "00",
              returnMessage: "Success.",
              affiliation: 37502603,
              status: "Pending",
              reference: "pedido123",
              tid: "8345000363484052380",
              nsu: "663206341",
              authorizationCode: "186376",
              kind: "Credit",
              amount: 2099,
              installments: 2,
              currency: "BRL",
              cardHolderName: "John Snow",
              cardBin: "544828",
              last4: "0007",
              softDescriptor: "lojarede",
              origin: 1,
              subscription: false,
              distributorAffiliation: 0
            },
            capture: {
              dateTime: "stringstringstringstringstrin",
              nsu: "string",
              amount: 0
            },
            threeDSecure: {
              embedded: true,
              eci: "st",
              cavv: "BwABBylVaQAAAAFwllVpAAAAAAA=",
              xid: "stringstringstringstringstri",
              returnCode: "str",
              returnMessage: "string"
            },
            refunds: {
              dateTime: "stringstringstringstringstrin",
              refundId: "stringstringstringstringstringstring",
              status: "Processing",
              amount: 0
            },
            links: [
              {
                method: "POST",
                rel: "refund",
                href: "https://sandbox-erede.useredecloud.com.br/v1/transactions/8345000363484052380/refunds"
              },
              {
                method: "PUT",
                rel: "capture",
                href: "https://sandbox-erede.useredecloud.com.br/v1/transactions/8345000363484052380"
              }
            ]
          }

        return  new Promise(function(resolve) {
          resolve(returnSearch);
      });
    }
}