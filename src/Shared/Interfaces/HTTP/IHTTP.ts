export interface IHTTP {
    get(endpoint: string): Promise<any>;
    post(endpoint: string, data: any): Promise<any>;
    put(endpoint: string, data: any): Promise<any>;
}
