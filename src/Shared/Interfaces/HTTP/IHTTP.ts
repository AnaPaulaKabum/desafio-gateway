import { ResponseAPI } from '../../../Infra/HTTP/AXIOS/ResponseAPI';

export interface IHTTP {
    setBaseUrl(baseUrl: string);
    setAuth(username: string, password: string);
    get(endpoint: string): Promise<ResponseAPI<any>>;
    post(endpoint: string, data: any): Promise<ResponseAPI<any>>;
    put(endpoint: string, data: any): Promise<ResponseAPI<any>>;
}
