import { ITransition } from "../../../2-Domain/Core/Interfaces/ITransition";

export class TransacaoRede implements ITransition{
    
    numberRequest: string;
    //Não envio desse campo será considerado crédito.
    kind: TipoTransacao;

    //Código do pedido gerado pelo estabelecimento.
    reference: string;
    
    //Valor total da transação sem separador de milhar e decimal.
    //Exemplos:
    //R$10,00 = 1000
    //R$0,50 = 50
    amount: number;
    installments: number;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
    softDescriptor: string;
    
    //Defina se uma transação terá captura automática ou posterior.
    // O não envio desse campo será considerado uma captura automática(true)
    captureAutomatica?: boolean;

    //Informa ao emissor se uma transação é proveniente de uma recorrência. Se transação por uma recorrência, enviar true. Caso contrário, envie false.
    //O não envio desse campo será considerado o valor false.
    subscription: boolean;

    //Identifica uma origem da transação.
    //e.Rede - 1
    //MasterPass - 4
    //Click to Pay- 6
    //O não envio desse campo será considerado uma transação e.Rede (1).
    origin: OriginCard;
}