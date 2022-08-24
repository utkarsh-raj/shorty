import { NextFunction, Request, Response } from "express";
import { BaseError, MappingNotFoundInDb } from "../common/errorClasses";

const errorClassifier = (err: BaseError) => {
    switch (err.constructor) {
        case MappingNotFoundInDb:
            return { message: 'URL not found', statusCode: err._statusCode || 404 };
        default:
            return { message: 'Internal server error', statusCode: 500 };
    }
};

export default async (err: BaseError, req: Request, res: Response, next: NextFunction) => {
    const classifiedError = errorClassifier(err);
    const errorOutput = {
        status: 'failure',
        error: classifiedError.message,
        statusCode: classifiedError.statusCode
    }
    return res.status(errorOutput.statusCode).json(errorOutput);
};
