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

            const returnGet = await axios.get(this.urlBase + endpoint, config);
            return returnGet.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    }
    async post(endpoint: string, data: any): Promise<any> {
        try {
            const config = {
                auth: this.auth,
            };

            const returnPost = await axios.post(this.urlBase + endpoint, data, config);
            return returnPost.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    }

    async put(endpoint: string, data: any): Promise<any> {
        try {
            const config = {
                auth: this.auth,
            };

            const returnPut = await axios.put(this.urlBase + endpoint, data, config);
            return returnPut.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    }
}
