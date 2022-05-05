export interface IHTTP {
    get(): Promise<any>;
    post(): Promise<any>;
    delete(): Promise<any>;
}
