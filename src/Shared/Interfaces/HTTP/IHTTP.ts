export interface IHTTP {
    setBaseUrl(baseUrl: string);
    setAuth(username: string, password: string);
    get(endpoint: string): Promise<any>;
    post(endpoint: string, data: any): Promise<any>;
    put(endpoint: string, data: any): Promise<any>;
}
