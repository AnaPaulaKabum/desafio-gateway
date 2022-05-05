import { IHTTP } from '../../../Shared/Interfaces/HTTP/IHTTP';
import axios from 'axios';

export class HttpAxios implements IHTTP {
    constructor(private readonly urlBase) {}

    async get(): Promise<any> {
        const resultado = await axios.get(this.urlBase);
        return resultado.data;
    }
    post(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
