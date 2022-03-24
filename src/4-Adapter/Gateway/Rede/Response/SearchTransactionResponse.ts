import { Link } from "./Link.js";

class Capture{
    dateTime: Date
    nsu: string
    amount: number
}

class Authorization {
    dateTime: Date
    returnCode: string
    returnMessage: string
    affiliation: number
    status: string
    reference: string
    tid: string
    nsu: string
    authorizationCode: string
    kind: string
    amount: number
    installments: number
    currency: string
    cardHolderName: string
    cardBin: string
    last4: string
    softDescriptor: string
    origin: number
    subscription: boolean
    distributorAffiliation
}

export class SearchTransactionResponse{

    requestDateTime: Date
    authorization:  Authorization
    capture: Capture
   /* threeDSecure: {
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
    },*/
    links: Array<Link>
  }