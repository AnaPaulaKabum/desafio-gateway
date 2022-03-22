import { plainToInstance } from 'class-transformer';
import { SendTranstionReturn } from '../Response/SendTransitionReturn.js';


export abstract class ConverterReturnAPITo {


    static converte(Json:any){
        
        let objeto = plainToInstance(SendTranstionReturn, Json); 

        console.log('xxx');
      //  console.log('xxx',objeto);

    }




}