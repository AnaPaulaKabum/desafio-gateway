import { TranscionarServices } from "../../domain/services/transicionarServices";
import { MappearTransicao } from "../Mappear/MappearTransicao";
import { CreateTransicaoRequest } from "../Request/createTransicaoRequest";


export class PagamentoController{

    constructor (private readonly transcionarServices: TranscionarServices ){}


    public enviarTransicao(createTransicaoRequest: CreateTransicaoRequest){

       const result = MappearTransicao.toDTO(createTransicaoRequest);
       this.transcionarServices.enviarTransicao(result);


    }

    public consultarTransicao(){

        this.transcionarServices.consultarTransicao();

        
    }

    public capturarTransicao(){

        
    }

    public cancelarTransicao(){

        
    }




}