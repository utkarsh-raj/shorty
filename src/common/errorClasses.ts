export abstract class BaseError extends Error {
    public readonly _errorCode: string;
    public readonly _statusCode: number;
    constructor(message?: string, statusCode?: number, errorCode?: string) {
        super(message);
        this._statusCode = statusCode as number;
        this._errorCode = errorCode as string;
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}

export class MappingNotFoundInDb extends BaseError {
    constructor(message?: string) {
        super(message);

        Object.setPrototypeOf(this, MappingNotFoundInDb.prototype);
    }
}
