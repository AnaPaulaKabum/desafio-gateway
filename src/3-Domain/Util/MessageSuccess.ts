export abstract class  MessageSucess{

    static generateMessage(tipo:string): string{

        return (tipo + ' gerado com sucesso')
    }
}