export class ResponseAPI<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error?: any;
    private _value?: T;

    private constructor(isSuccess: boolean, error?: any, value?: T) {
        if (isSuccess && error) {
            throw new Error(`InvalidOperation: A result cannot be 
          successful and contain an error`);
        }
        if (!isSuccess && !error) {
            throw new Error(`InvalidOperation: A failing result 
          needs to contain an error message`);
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;

        this.error = error;
        this._value = value;

        Object.freeze(this);
    }

    public getValue(): T | undefined {
        if (!this.isSuccess) {
            throw new Error(`Can't retrieve the value from a failed result.`);
        }

        return this._value;
    }

    public static ok<U>(value: U): ResponseAPI<U> {
        return new ResponseAPI<U>(true, '', value);
    }

    public static fail<U>(error: string): ResponseAPI<U> {
        return new ResponseAPI<U>(false, error);
    }
}
