export abstract class MockCancelTransafction{

    static cancel(numberRequest:string): Promise<any> {
        
        const returnCancel = {

            returnCode: "360",
            returnMessage: "Refund request has been successful",
            refundId: "d21c0fa9-aa0f-4b9f-aedc-a1d4ed08e03d",
            tid: "9274256037511432483",
            nsu: "750004939",
            refundDateTime: "2017-02-11T08:45:00.000-03:00",
            cancelId: "786524681",
            links: [
            {
                method: "GET",
                rel: "refund",
                href: "https://sandbox-erede.useredecloud.com.br/v1/transactions/9274256037511432483/refunds/5938e353-a6e7-430f-bac3-869acf1e7665"
            },
            {
                method: "GET",
                rel: "transaction",
                href: "https://sandbox-erede.useredecloud.com.br/v1/transactions/9274256037511432483"
            },
            {
                method: "GET",
                rel: "refunds",
                href: "https://sandbox-erede.useredecloud.com.br/v1/transactions/9274256037511432483/refunds"
            }
            ]
        }

        return  new Promise(function(resolve, reject) {
            resolve({returnCancel})});
   }
}