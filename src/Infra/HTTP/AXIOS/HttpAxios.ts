import { IHTTP } from '../../../Domain/Shared/Interfaces/HTTP/IHTTP';
import axios from 'axios';
import { ResponseAPI } from './ResponseAPI';

export class HttpAxios implements IHTTP {
    private auth;
    private baseUrl;

    setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    setAuth(username: string, password: string) {
        this.auth = { username: username, password: password };
    }

    private isValidBaseUrl(): boolean {
        return !!this.isValidBaseUrl;
    }

    async get(endpoint: string): Promise<ResponseAPI<any>> {
        if (!this.isValidBaseUrl()) throw new Error('BaseUrl não é valida.');

        try {
            const config = {
                auth: this.auth,
            };

            return ResponseAPI.ok((await axios.get(this.baseUrl + endpoint, config)).data);
        } catch (error) {
            console.log(JSON.stringify(error.response.data));
            return ResponseAPI.fail(error.response.data);
        }
    }
    async post(endpoint: string, data: any): Promise<ResponseAPI<any>> {
        if (!this.isValidBaseUrl()) throw new Error('BaseUrl não é valida.');

        try {
            const config = {
                auth: this.auth,
            };

            return ResponseAPI.ok((await axios.post(this.baseUrl + endpoint, data, config)).data);
        } catch (error) {
            console.log(JSON.stringify(error.response.data));
            return ResponseAPI.fail(error.response.data);
        }
    }

    async put(endpoint: string, data: any): Promise<ResponseAPI<any>> {
        if (!this.isValidBaseUrl()) throw new Error('BaseUrl não é valida.');
        try {
            const config = {
                auth: this.auth,
            };

            return ResponseAPI.ok(await (await axios.put(this.baseUrl + endpoint, data, config)).data);
        } catch (error) {
            console.log(JSON.stringify(error.response.data));
            return ResponseAPI.fail(error.response.data);
        }
    }
}
