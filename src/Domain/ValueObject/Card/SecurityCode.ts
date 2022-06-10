export class SecurityCode {
    private constructor(private _securityCode) {}

    static create(securityCode: string) {
        const NUMBER_SECURITY_CODE_MIM = 3;
        const NUMBER_SECURITY_CODE_MAX = 4;

        if (!(securityCode.length >= NUMBER_SECURITY_CODE_MIM && securityCode.length <= NUMBER_SECURITY_CODE_MAX))
            throw new Error(
                'CardSecurityCode deverá valores entre  ' +
                    NUMBER_SECURITY_CODE_MIM +
                    ' e ' +
                    NUMBER_SECURITY_CODE_MAX +
                    ' caracter',
            );

        return new SecurityCode(securityCode);
    }

    public get(): string {
        return this._securityCode;
    }
}
