import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Default error response
    const errorResponse = {
        success: false,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Something went wrong!",
        error: {
            name: err.name || "UnknownError",
            code: err.code || null,
            meta: err.meta || null,
        },
    };

    // PostgreSQL Error 
    switch (err.code) {
        case 'P2002': 
            errorResponse.status = StatusCodes.CONFLICT;
            errorResponse.message = "A record with this value already exists.";
            break;
        case 'P2025': 
            errorResponse.status = StatusCodes.NOT_FOUND;
            errorResponse.message = "The requested record was not found.";
            break;
        case 'P2003':
            errorResponse.status = StatusCodes.BAD_REQUEST;
            errorResponse.message = "Invalid reference in the database. Please check related records.";
            break;
        default:
            console.error("Unhandled Error:", err);
            break;
    }

    res.status(errorResponse.status).json(errorResponse);
};
