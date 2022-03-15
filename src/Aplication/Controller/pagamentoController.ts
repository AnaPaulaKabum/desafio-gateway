import { TranscionarServices } from "../../domain/services/transicionarServices";
import { MappearTransicao } from "../Mappear/MappearTransicao";
import { CreateTransicaoRequest } from "../Request/createTransicaoRequest";


export class PagamentoController{

    constructor (private readonly transcionarServices: TranscionarServices ){}


    public enviarTransicao(createTransicaoRequest: CreateTransicaoRequest){

       const resultado = MappearTransicao.toDTO(createTransicaoRequest);
       this.transcionarServices.enviarTransicao(resultado);
    }

    public consultarTransicao(){

        this.transcionarServices.consultarTransicao();

        
    }

    public capturarTransicao(){

        
    }

    public cancelarTransicao(){

        
    }




}