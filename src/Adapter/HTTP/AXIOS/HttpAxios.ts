import { IHTTP } from '../../../Shared/Interfaces/HTTP/IHTTP';
import axios from 'axios';

export class HttpAxios implements IHTTP {
    private auth;

    constructor(private readonly urlBase: string, username: string, password: string) {
        this.auth = { username: username, password: password };
    }

    async get(endpoint: string): Promise<any> {
        try {
            const config = {
                auth: this.auth,
            };

            const req = await axios.get(this.urlBase + endpoint, config);
            return req.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    }
    async post(endpoint: string, data: any): Promise<any> {
        try {
            const config = {
                auth: this.auth,
            };

            const req = await axios.post(this.urlBase + endpoint, data, config);

            return req.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    }

    async put(endpoint: string, data: any): Promise<any> {
        try {
            const config = {
                auth: this.auth,
            };

            const req = await axios.put(this.urlBase + endpoint, data, config);

            return req.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    }
}
