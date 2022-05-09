import { IHTTP } from '../../../Shared/Interfaces/HTTP/IHTTP';
import axios from 'axios';

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

    async get(endpoint: string): Promise<any> {
        if (!this.isValidBaseUrl()) throw new Error('BaseUrl não é valida.');

        try {
            const config = {
                auth: this.auth,
            };

            const returnGet = await axios.get(this.baseUrl + endpoint, config);
            return returnGet.data;
        } catch (error) {
            console.log(JSON.stringify(error.response.data));
            throw new Error(error.response.data);
        }
    }
    async post(endpoint: string, data: any): Promise<any> {
        if (!this.isValidBaseUrl()) throw new Error('BaseUrl não é valida.');

        try {
            const config = {
                auth: this.auth,
            };

            const returnPost = await axios.post(this.baseUrl + endpoint, data, config);
            return returnPost.data;
        } catch (error) {
            console.log(JSON.stringify(error.response.data));
            throw new Error(error.response.data);
        }
    }

    async put(endpoint: string, data: any): Promise<any> {
        if (!this.isValidBaseUrl()) throw new Error('BaseUrl não é valida.');
        try {
            const config = {
                auth: this.auth,
            };

            const returnPut = await axios.put(this.baseUrl + endpoint, data, config);
            return returnPut.data;
        } catch (error) {
            console.log(JSON.stringify(error.response.data));
            throw new Error(error.response.data);
        }
    }
}
