import { TranscionarServices } from "../../domain/services/transicionarServices";
import { MappearTransicao } from "../Mappear/MappearTransicao";
import { CreateTransicaoRequest } from "../Request/createTransicaoRequest";


export class PagamentoGatewaysController{

    constructor (private readonly transcionarServices: TranscionarServices ){}


    public enviarTransicao(createTransicaoRequest: CreateTransicaoRequest){

       const resultado = MappearTransicao.toDTO(createTransicaoRequest);
       this.transcionarServices.enviarTransicao(resultado);
    }

    public consultarTransicao(paramNumPedido :string){

        this.transcionarServices.consultarTransicao(paramNumPedido);

        
    }

    public capturarTransicao(paramNumPedido:string){

        this.transcionarServices.capturarTransicao(paramNumPedido); 
    }

    public cancelaExtornoTransicao(paramNumPedido:string){

        this.cancelaExtornoTransicao(paramNumPedido)
        
    }




}