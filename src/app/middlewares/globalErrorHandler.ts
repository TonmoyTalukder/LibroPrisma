import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err.code === 'P2025' || err.code ===  "P2002" || err.code ===  "P2003") {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.name || "Something went wrong!",
            error: {
                name: err.name || "UnknownError",
                code: err.code || null,
                meta: err.meta || null,
            },
        })
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong!",
        error: err
    })
}